export default function Form() {
  return (
    <div class="w-2/4 h-full">
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
          class="border-2 border-solid border-[##e3e4e6] w-full h-10 my-2"
          name=""
          id="assunto"
        >
          <option value="">Dúvidas Sobre Produtos</option>
          <option value="">Elogios</option>
          <option value="">Reclamações</option>
          <option value="">Pedido</option>
          <option value="">Trocas e Devoluções</option>
        </select>

        <label for="mensagem">Assunto</label>
        <textarea
          class="w-full h-10 border-2 border-solid border-[##e3e4e6] my-2"
          name=""
          id="mensagem"
          cols={30}
          rows={10}
        >
        </textarea>
        <div class="w-full flex items-end justify-end mt-4">
          <button class="text-white bg-[#12B888] py-4 px-10">Enviar</button>
        </div>
      </form>
    </div>
  );
}
