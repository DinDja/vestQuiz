import React from 'react';
import { AnimatePresence } from 'framer-motion';
import useGeoGameOnline from '../../hooks/useGeoGameOnline';
import { GeoOnlineMenu } from './GeoOnlineMenu';
import { GeoOnlineLobby } from './GeoOnlineLobby';
import { GeoOnlinePlay } from './GeoOnlinePlay';
import { GeoOnlineResults } from './GeoOnlineResults';

export const GeoGameOnline = ({ onClose, setView, isDark, userData, updateProgress, unlockBadge }) => {
  const game = useGeoGameOnline(userData);

  const handleCreateRoom = (settings) => game.createRoom(settings);

  return (
    <div className="fixed inset-0 z-[7000] bg-slate-950">
      <div className="max-w-3xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {game.phase === 'menu' && (
            <GeoOnlineMenu
              key="menu"
              isDark={isDark}
              onCreateRoom={handleCreateRoom}
              onJoinRoom={game.joinRoom}
              onBack={() => { game.resetState?.(); if (onClose) onClose(); else setView('dashboard'); }}
              error={game.error}
              setError={game.setError}
            />
          )}

          {game.phase === 'lobby' && (
            <GeoOnlineLobby
              key="lobby"
              isDark={isDark}
              roomCode={game.roomCode}
              roomData={game.roomData}
              players={game.players}
              isHost={game.isHost}
              onStartGame={game.startGame}
              onLeave={async () => { await game.leaveRoom(); if (onClose) onClose(); else setView('dashboard'); }}
              addBot={game.addBot}
              error={game.error}
            />
          )}

          {game.phase === 'countdown' && (
            <div key="countdown" className="text-center text-white font-black">Preparando partida...</div>
          )}

          {game.phase === 'playing' && (
            <GeoOnlinePlay
              key="playing"
              isDark={isDark}
              roomData={game.roomData}
              currentQuestion={game.currentQuestion}
              currentQuestionIndex={game.currentQuestionIndex}
              totalQuestions={game.totalQuestions}
              timer={game.timer}
              myAnswer={game.myAnswer}
              showExplanation={game.showExplanation}
              setShowExplanation={game.setShowExplanation}
              onSubmitAnswer={game.handleSubmitAnswer}
              onAdvanceQuestion={game.advanceQuestion}
              isHost={game.isHost}
              players={game.players}
              sortedPlayers={game.sortedPlayers}
              allAnswered={game.allAnswered}
              userData={userData}
              updateProgress={updateProgress}
              onLeave={async () => { await game.leaveRoom(); if (onClose) onClose(); else setView('dashboard'); }}
            />
          )}

          {game.phase === 'results' && (
            <GeoOnlineResults
              key="results"
              isDark={isDark}
              roomData={game.roomData}
              sortedPlayers={game.sortedPlayers}
              onLeave={() => {
                game.leaveRoom();
                if (onClose) onClose(); else setView('dashboard');
              }}
              updateProgress={updateProgress}
              unlockBadge={unlockBadge}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GeoGameOnline;
