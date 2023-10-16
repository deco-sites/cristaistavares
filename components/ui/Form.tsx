export default function Form() {
    return (
        <form action="">
            <label for="nome">Nome</label>
                <input type="text" id="nome"/>
            <label for="e-mail">E-mail</label>
                <input type="text" id="e-mail"/>
            <label for="telefone">Telefone</label>
                <input type="text" id="telefone"/>

            <label for="assunto">Assunto</label>
            <select name="" id="assunto">
                <option value="">Dúvidas Sobre Produtos</option>
                <option value="">Elogios</option>
                <option value="">Reclamações</option>
                <option value="">Pedido</option>
                <option value="">Trocas e Devoluções</option>
            </select>

            <label for="mensagem">Assunto</label>
            <textarea name="" id="mensagem" cols={30} rows={10}></textarea>
            <button>Enviar</button>
        </form>
        )
}