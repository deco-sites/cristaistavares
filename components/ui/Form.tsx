export default function Form() {
  return (
    <div class="w-full h-full flex flex-col md:flex-row gap-3 md:gap-0">
      <div class="w-full lg:w-2/4 h-full">
        <form class="w-full h-full flex flex-col">
          <label for="nome">Nome</label>
          <input
            class="border-2 border-solid border-[##e3e4e6] w-full h-10 my-2"
            type="text"
            id="nome"
          />
          <label for="e-mail">E-mail</label>
          <input
            class="border-2 border-solid border-[##e3e4e6] w-full h-10 my-2"
            type="text"
            id="e-mail"
          />
          <label for="telefone">Telefone</label>
          <input
            class="border-2 border-solid border-[##e3e4e6] w-full h-10 my-2"
            type="text"
            id="telefone"
          />

          <label for="assunto">Assunto</label>
          <select
            class="border-2 border-solid border-[##e3e4e6] w-full h-10 my-2 text-xs lg:text-base"
            name=""
            id="assunto"
          >
            <option value="Duvidas Sobre Produtos">
              Dúvidas Sobre Produtos
            </option>
            <option value="Elogios">Elogios</option>
            <option value="Reclamações">Reclamações</option>
            <option value="Pedido">Pedido</option>
            <option value="Trocas e Devolucoes">Trocas e Devoluções</option>
          </select>

          <label for="mensagem">Assunto</label>
          <textarea
            class="w-full h-10 border-2 border-solid border-[##e3e4e6] my-2 min-h-[120px]"
            name=""
            id="mensagem"
            cols={30}
            rows={30}
          >
          </textarea>
          <div class="w-full flex items-end justify-end mt-4">
            <button class="text-white bg-[#12B888] py-4 px-10">Enviar</button>
          </div>
        </form>
      </div>
      <div>
        <div class="min-w-[325px] max-w-[362px] h-[584px] bg-[#F4F4F4] md:ml-10 p-4 md:p-8">
          <div class="mb-[16px]">
            <p class="text-[14px]">Televendas</p>
          </div>
          <div class="mb-[30px]">
            <p class="text-[12px]">
              Clique no link para falar conosco via whatsapp:
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=5547991151995&text&type=phone_number&app_absent=0"
              class="underline text-[12px] text-[#0000EE]"
            >
              https://api.whatsapp.com/send/?phone=5547991151995&text&type=phone_number&app_absent=0
            </a>
          </div>
          <div class="mb-[20px]">
            <p class="text-[16px]">(47) 3232-1875</p>
            <p class="text-[16px]">(47) 99115-1995</p>
          </div>
          <div class="my-[14px]">
            <p class="text-[14px]">SAC e Atendimento</p>
          </div>
          <div class="my-[14px]">
            <p class="text-[16px]">(47) 3232-1875</p>
            <p class="text-[16px]">(47) 99115-1995</p>
          </div>
          <div>
            <p class="text-[10px]">Para todo o Brasil</p>
          </div>
          <div class="my-[16px]">
            <a
              href="faleconosco@cristaistavares.com.br"
              class="underline text-[12px] text-[#0000EE]"
            >
              faleconosco@cristaistavares.com.br
            </a>
          </div>
          <div class="my-[30px]">
            <p class="text-[12px]">
              Das 08h às 17h45 de segunda a sexta-feira.*
            </p>
            <p class="text-[10px]">*Exceto feriados</p>
          </div>
          <div class="mb-[20px]">
            <p class="text-[16px]">(47) 3232-1875</p>
            <p class="text-[16px]">(47) 99115-1995</p>
          </div>
        </div>
      </div>
    </div>
  );
}
