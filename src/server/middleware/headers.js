import crypto from 'crypto';

export default function headers() {
  return function* genHeaders(next) {
    yield next;
    if (this.body) {
      this.set('Content-Length', this.body.length.toString());
      this.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      this.set('Pragma', 'no-cache');
      this.set('Expires', 0);
      this.set('etag', crypto.createHash('md5').update(this.body).digest('hex'));
    }
  };
}
