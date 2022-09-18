import CreateAdBanner from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { Input } from "./components/Form/Input";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import "./styles/main.css";

import logoImg from "./assets/logo-nlw-esportssvg.svg";
import { GameController } from "phosphor-react";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
          {games.map(game => {
            return (
              <GameBanner 
                key={game.id}
                bannerUrl={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads} 
              />
            )
          })}
      </div>
      
      <Dialog.Root>
        <CreateAdBanner />
        
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-70 inset-0 fixed"/>

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>
                  <Input id="game" placeholder="Selecione o game que deseja jogar..."/>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input id="name" placeholder="Como te chamam dentro do game?"/>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input type="number" id="yearsPlaying" placeholder="Tudo bem ser ZERO"/>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual o seu Discord?</label>
                    <Input type="text" id="discord" placeholder="Usuario#0000"/>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>

                    <div className="grid grid-cols-4 gap-2">
                      <button 
                        title="Domingo"
                        className="w-8 h-8 rounded bg-zinc-900"
                        >
                          D</button>
                      <button 
                        title="Segunda"
                        className="w-8 h-8 rounded bg-zinc-900"
                        >
                          S</button>
                      <button 
                        title="Terça"
                        className="w-8 h-8 rounded bg-zinc-900"
                        >
                          T</button>
                      <button 
                        title="Quarta"
                        className="w-8 h-8 rounded bg-zinc-900"
                        >
                          Q</button>
                      <button 
                        title="Quinta"
                        className="w-8 h-8 rounded bg-zinc-900"
                        >
                          Q</button>
                      <button 
                        title="Sexta"
                        className="w-8 h-8 rounded bg-zinc-900"
                        >
                          S</button>
                      <button 
                        title="Sábado"
                        className="w-8 h-8 rounded bg-zinc-900"
                        >
                          S</button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" id="hourStart" placeholder="De"/>
                      <Input type="time" id="hourEnd" placeholder="Até"/>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm">
                  <Input type="checkbox"/>
                  Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit">
                    <GameController className="w-6 h-6"/>
                    Encontrar duo
                  </button>
                </footer>
              </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App;
