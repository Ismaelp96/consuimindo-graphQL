import { useState } from 'react';
import { useReactiveVar } from '@apollo/client';

import { ICategoria } from '../../interfaces/ICategoria';
import CardLivro from '../CardLivro';
import './ListaLivros.css';
import { AbBotao, AbCampoTexto } from 'ds-alurabooks';
import { useLivros } from '../../graphql/livros/hooks';
import { livrosVar } from '../../graphql/livros/state';

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [textoBusca, setTextoBusca] = useState('');

  const livros = useReactiveVar(livrosVar);
  console.log('livros =>', livros);

  const { data, refetch } = useLivros(categoria);

  if (data?.livros) {
    livrosVar(data.livros);
  }

  const buscarLivros = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textoBusca) {
      refetch({
        categoriaId: categoria.id,
        titulo: textoBusca,
      });
    }
  };
  // const { data: produtos } = useQuery(['buscaLivrosPorCategoria', categoria], () => obterProdutosDaCategoria(categoria))
  return (
    <section>
      <form
        onSubmit={buscarLivros}
        style={{ maxWidth: '80%', margin: '0 auto', textAlign: 'center' }}
      >
        <AbCampoTexto
          value={textoBusca}
          onChange={setTextoBusca}
          placeholder='Digite o título'
        />
        <div style={{ marginTop: '16px' }}>
          <AbBotao texto='Buscar' />
        </div>
      </form>
      <div className='livros'>
        {data?.livros.map((livro) => (
          <CardLivro livro={livro} key={livro.id} />
        ))}
      </div>
    </section>
  );
};

export default ListaLivros;
