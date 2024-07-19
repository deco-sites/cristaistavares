import { useScript } from "deco/hooks/useScript.ts";

export default function LoadingProgressBar() {
  function handleSidebarLogic() {
    const progressBar = document.getElementById("progressbar")!;

    setTimeout(() => {
      progressBar.classList.add("hidden");
    }, 1500);
  }

  return (
    <>
      <div
        id="progressbar"
        class="fixed top-0 left-0 right-0 h-1 bg-whitesmoke"
      >
        <div className="h-full bg-dark-pink progress-animation" />
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(handleSidebarLogic),
        }}
      />
    </>
  );
}
