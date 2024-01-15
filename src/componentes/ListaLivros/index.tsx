import { useState } from 'react';
import { useReactiveVar } from '@apollo/client';

import { ICategoria } from '../../interfaces/ICategoria';
import CardLivro from '../CardLivro';
import './ListaLivros.css';
import { AbBotao, AbCampoTexto } from 'ds-alurabooks';
import { useLivros } from '../../graphql/livros/hooks';
import { filtroLivrosVar, livrosVar } from '../../graphql/livros/state';

interface ListaLivrosProps {
  categoria: ICategoria;
}

const ListaLivros = ({ categoria }: ListaLivrosProps) => {
  const [textoBusca, setTextoBusca] = useState('');

  filtroLivrosVar({
    categoria,
  });

  const livros = useReactiveVar(livrosVar);

  useLivros();

  return (
    <section>
      <form style={{ maxWidth: '80%', margin: '0 auto', textAlign: 'center' }}>
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
        {livros.map((livro) => (
          <CardLivro livro={livro} key={livro.id} />
        ))}
      </div>
    </section>
  );
};

export default ListaLivros;
