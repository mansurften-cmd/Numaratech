import http.server, functools, pathlib, sys
hdr = pathlib.Path('public/_headers').read_text()
csp = next(l.split(':',1)[1].strip() for l in hdr.splitlines() if l.strip().startswith('Content-Security-Policy:'))
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self): self.send_header('Content-Security-Policy', csp); super().end_headers()
    def log_message(self,*a): pass
http.server.HTTPServer(('127.0.0.1', int(sys.argv[1])), functools.partial(H, directory='dist')).serve_forever()
