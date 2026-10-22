"""Serve the portfolio over loopback HTTP for embedded video playback."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.request import urlopen
import argparse,json,threading,webbrowser

ROOT=Path(__file__).resolve().parent.parent
HOST='127.0.0.1'
PORT=8765
BASE=f'http://{HOST}:{PORT}'
HEALTH='/__yerim_preview_health__'
IDENTITY='yerim_cv_preview'

class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
 def end_headers(self):
  self.send_header('Referrer-Policy','strict-origin-when-cross-origin')
  self.send_header('Cache-Control','no-store')
  super().end_headers()
 def do_GET(self):
  if self.path==HEALTH:
   body=json.dumps({'app':IDENTITY}).encode('utf8')
   self.send_response(200);self.send_header('Content-Type','application/json');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body);return
  super().do_GET()
 def log_message(self,*args):pass

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--no-browser',action='store_true');args=parser.parse_args();target=BASE+'/project.html'
 try:server=ThreadingHTTPServer((HOST,PORT),Handler)
 except OSError as exc:
  try:
   with urlopen(BASE+HEALTH,timeout=2) as response:existing=json.load(response)
   if existing.get('app')!=IDENTITY:raise RuntimeError('Another application owns this port.')
  except Exception:raise RuntimeError(f'Port {PORT} is in use. Close that service first.') from exc
  if not args.no_browser:webbrowser.open(target)
  print(target);return
 print(target,flush=True)
 if not args.no_browser:threading.Timer(.4,lambda:webbrowser.open(target)).start()
 try:server.serve_forever()
 except KeyboardInterrupt:pass
 finally:server.server_close()

if __name__=='__main__':main()
