import { useScript } from "deco/hooks/useScript.ts";

export default function ShareButton() {
  const handleShareItem = () => {
    const btn = document.getElementById("share-button");

    btn?.addEventListener("click", async () => {
      const shareData = {
        title: "Veja este produto!",
        text: "Estou compartilhando com você este produto.",
        url: window.location.href,
      };

      try {
        await navigator.share(shareData);
      } catch {
        console.log("Erro ao tentar compartilhar.");
      }
    });
  };

  return (
    <>
      <button
        id="share-button"
        class="w-7 h-full p-1 rounded-full hover:bg-zinc-400/40 transition-all duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0,0,256,256"
          style="fill:#FFFFFF;"
        >
          <g
            fill="#000000"
            fill-rule="nonzero"
            stroke="none"
            stroke-width="1"
            stroke-linecap="butt"
            stroke-linejoin="miter"
            stroke-miterlimit="10"
            stroke-dasharray=""
            stroke-dashoffset="0"
            font-family="none"
            font-weight="none"
            font-size="none"
            text-anchor="none"
            style="mix-blend-mode: normal"
          >
            <g transform="scale(8.53333,8.53333)">
              <path d="M23,3c-2.20914,0 -4,1.79086 -4,4c0.00178,0.28117 0.03321,0.56136 0.09375,0.83594l-9.08203,4.54102c-0.75785,-0.87251 -1.85604,-1.3746 -3.01172,-1.37695c-2.20914,0 -4,1.79086 -4,4c0,2.20914 1.79086,4 4,4c1.15606,-0.0013 2.25501,-0.5027 3.01367,-1.375l9.07617,4.53906c-0.05923,0.27472 -0.08934,0.55491 -0.08984,0.83594c0,2.20914 1.79086,4 4,4c2.20914,0 4,-1.79086 4,-4c0,-2.20914 -1.79086,-4 -4,-4c-1.15606,0.0013 -2.25501,0.5027 -3.01367,1.375l-9.07617,-4.53906c0.05923,-0.27472 0.08934,-0.55491 0.08984,-0.83594c-0.00192,-0.28051 -0.03334,-0.56005 -0.09375,-0.83398l9.08203,-4.54102c0.75821,0.87178 1.85635,1.37313 3.01172,1.375c2.20914,0 4,-1.79086 4,-4c0,-2.20914 -1.79086,-4 -4,-4z">
              </path>
            </g>
          </g>
        </svg>
      </button>

      <script
        defer
        dangerouslySetInnerHTML={{ __html: useScript(handleShareItem) }}
      />
    </>
  );
}
