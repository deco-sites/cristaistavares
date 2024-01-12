const Mailbiz = () => {
  const scriptCode = `
    (function(m, a, i, l, b, z, j, s) {
      if (m[z]) return;
      m[z] = {
        id: b,
        ready: 0
      };
      z = a.createElement(i);
      j = a.getElementsByTagName(i)[0];
      z.async = 1;
      z.src = l;
      j.parentNode.insertBefore(z, j);
    })(window, document, 'script', 'https://d3eq1zq78ux3cv.cloudfront.net/static/scripts/integration.min.js', '65521c0c7058d778ef9480cd', 'MailbizIntegration');
  `;

  const onLoadScriptCode = `
    document.addEventListener('DOMContentLoaded', function() {
      ${scriptCode}
    });
  `;

  return (
    <>
      <script defer dangerouslySetInnerHTML={{ __html: onLoadScriptCode }} />
    </>
  );
};

export default Mailbiz;
