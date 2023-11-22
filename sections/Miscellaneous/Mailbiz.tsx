const Mailbiz = () => {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "Cristais Tavares Decoracao Em Murano Eireli",
    "alternateName":
      "Cristais Tavares - Maior loja de decoração em murano direto de fábrica.",
    "url": "https://www.cristaistavares.com.br/",
    "logo":
      `https://www.cristaistavares.com.br/live/invoke/website/loaders/image.ts?src=${
        encodeURIComponent(
          "https://cristaistavares.vtexassets.com/arquivos/logo-cristais-tavares-svg.svg",
        )
      }&fit=cover&width=252&height=32&__frsh_c=09ca21774e269fa5baf6f5f5895786154727ccbc`,
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "(47) 3232-1875",
      "contactType": "sales",
      "areaServed": "BR",
      "availableLanguage": "Portuguese",
    }, {
      "@type": "ContactPoint",
      "telephone": "(47) 99115-1995",
      "contactType": "customer service",
      "areaServed": "BR",
      "availableLanguage": "Portuguese",
    }],
    "sameAs": [
      "https://www.facebook.com/cristaistavares/",
      "https://www.instagram.com/cristaistavares/",
      "https://br.pinterest.com/cristaistavares/",
      "https://www.cristaistavares.com.br/",
      "https://www.youtube.com/channel/UCRJ_WTKeL6jtu2C1B-5vIhw",
      "https://br.linkedin.com/company/cristais-tavares",
      "https://twitter.com/CristaisTavares",
    ],
  };

  return (
    <>
      <script async type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </>
  );
};

export default Mailbiz;
