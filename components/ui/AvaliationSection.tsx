export default function AvaliationSection() {
  return (
    <div class="flex w-full h-full items-center justify-center px-6 lg:px-0">
      <div class="flex items-center justify-center max-w-[1272px] w-full">
        <section class="flex flex-col items-center justify-center w-full">
          <div class="flex items-center justify-center">
            <h1 class="text-center text-[32px] leading-10 font-semibold">
              Avaliações
            </h1>
          </div>
          <div class="flex flex-col gap-1 align-middle items-start justify-start w-full">
            <div class="rating align-middle gap-1">
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={false}
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={false}
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={false}
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={false}
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-yellow-300 w-5 cursor-default"
                checked={false}
              />
            </div>
            <div class="flex flex-col items-start justify-start mt-5 w-full">
              <div>
                <p class="text-sm">Classificação média: 0 (0 avaliações)</p>
              </div>
              <div class="mt-10 pl-2">
                <a href="">
                  <p class="text-sm underline">
                    Faça login para escrever uma avaliação
                  </p>
                </a>
              </div>
              <div class="flex items-start justify-start gap-1 mt-7">
                <select class="text-sm border-2 rounded-md py-[0.25rem] px-[0.5rem]">
                  <option value="recentes">Mais Recentes</option>
                  <option value="antigas">Mais Antigas</option>
                  <option value="classAlta">Classificação Mais Alta</option>
                  <option value="classBaixa">Classificação Mais baixa</option>
                </select>
                <select class="text-sm border-2 rounded-md py-[0.25rem] px-[0.5rem]">
                  <option value="todos">Todos</option>
                  <option value="1star">1 Estrela</option>
                  <option value="2star">2 Estrelas</option>
                  <option value="3star">3 Estrelas</option>
                  <option value="4star">4 Estrelas</option>
                  <option value="5star">5 Estrelas</option>
                </select>
              </div>
              <div class="flex items-start justify-start border-b-4 border-solid border-[#f2f4f5] min-w-full mb-5 py-3">
                <h1 class="text-start text-xl text-dark-pink font-semibold">
                  Nenhuma avaliação
                </h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
