import { ChangeEvent, FormEvent, useState } from 'react'
import Header from './components/Header/Header'
import { ClipboardText, PlusCircle } from "phosphor-react";
import Task from './components/Task/Task'
import styles from './app.module.css'

function App() {
  const [novaTarefa, definirNovaTarefa] = useState("");
  const [tarefas, definirTarefa] = useState([] as any[]);
  const [filtro, filtrar] = useState('todos');
  const manusearNovaTarefa = (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      definirNovaTarefa(event.target.value);
      console.log(event.target.value)
  };

  const criarNovaTarefa = (event: FormEvent) => {
    event.preventDefault();
    if(novaTarefa!=""){
      definirTarefa((prev) => [
      ...prev,
      {
        id: Math.random(),
        title: novaTarefa,
        isCompleted: false,
        isDeleted: false,
      }
    ])
    };
    console.log(tarefas)
    definirNovaTarefa("")
  }

  const completarTarefa = (id: string) => {
    const concluirTarefa = tarefas.map((tarefa)=> tarefa.id==id ? {...tarefa, isCompleted : !tarefa.isCompleted} : tarefa)
    definirTarefa(concluirTarefa)
    console.log(tarefas)
  }

  const removerTarefa = (id: string) => {
    const excluirTarefa = tarefas.map((tarefa)=> tarefa.id==id ? {...tarefa, isDeleted : !tarefa.isDeleted} : tarefa)
    definirTarefa(excluirTarefa)
    console.log(tarefas)
  }

  let count = 0
  tarefas.map((tarefa)=> tarefa.isCompleted && count++)

  let countd = 0
  tarefas.map((tarefa)=> tarefa.isDeleted && countd++)
  return (
    <>
    <Header/>
    <main className={styles.wrapper}>
      <form className={styles.newText} onSubmit={criarNovaTarefa}>
        <input type="text" value={novaTarefa} onChange={manusearNovaTarefa} placeholder='Adicione uma nova tarefa'/>
        <button type="submit">Criar<PlusCircle size={25}/></button>
        </form>
        <div>
          <div className={styles.filters}>
            <button onClick={() => filtrar('todos')}>Todos</button>
            <button onClick={() => filtrar('ativos')}>Ativos</button>
            <button onClick={() => filtrar('completados')}>Completados</button>
          </div>
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <div>
                <strong>Tarefas criadas</strong>
                <span>{tarefas.length}</span>
              </div>
              <div>
                <strong>concluídas</strong>
                <span>{count} de {tarefas.length}</span>
              </div>
              <div>
                <strong>excluídas</strong>
                <span>{countd} de {tarefas.length}</span>
              </div>
              <div>
                <strong>Estado</strong>
                <span>{filtro}</span>
              </div>
            </div>
            <div className={styles.contentBox}>
              {tarefas.length > 0
              ? filtro == 'todos' ?
              tarefas.map(tarefa => !tarefa.isDeleted && <Task key={tarefa.id} id={tarefa.id} title={tarefa.title} isCompleted={completarTarefa} isDeleted={removerTarefa} checked={tarefa.isCompleted}/>)
              : filtro == 'ativos' ?
              tarefas.map(tarefa => (!tarefa.isCompleted && !tarefa.isDeleted) && <Task key={tarefa.id} id={tarefa.id} title={tarefa.title} isCompleted={completarTarefa} isDeleted={removerTarefa} checked={tarefa.isCompleted}/>)
              : tarefas.map(tarefa => (tarefa.isCompleted && !tarefa.isDeleted) && <Task key={tarefa.id} id={tarefa.id} title={tarefa.title} isCompleted={completarTarefa} isDeleted={removerTarefa} checked={tarefa.isCompleted}/>)
              : <>
              <ClipboardText size={56}/>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <small>Crie tarefas e organize seus itens a fazer</small>
              </>}
            </div>
          </div>
        </div>
    </main>

    </>
  )
}

export default App
