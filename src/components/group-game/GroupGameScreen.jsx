// src/components/group-game/GroupGameScreen.jsx
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGroupGame } from '../../hooks/useGroupGame';
import { GroupGameMenu, GroupGameLobby } from './GroupGameLobby';
import { CountdownOverlay, GroupGamePlay } from './GroupGamePlay';
import { GroupGameResults } from './GroupGameResults';

export const GroupGameScreen = ({ setView, isDark, userData, updateProgress }) => {
  const game = useGroupGame(userData);

  return (
    <div className="min-h-screen relative">
      <AnimatePresence mode="wait">

        {/* ── MENU: Criar ou Entrar ── */}
        {game.phase === 'menu' && (
          <GroupGameMenu
            key="menu"
            isDark={isDark}
            onCreateRoom={game.createRoom}
            onJoinRoom={game.joinRoom}
            onBack={() => setView('dashboard')}
            error={game.error}
            setError={game.setError}
          />
        )}

        {/* ── LOBBY: Sala de Espera ── */}
        {game.phase === 'lobby' && (
          <GroupGameLobby
            key="lobby"
            isDark={isDark}
            roomCode={game.roomCode}
            roomData={game.roomData}
            players={game.players}
            isHost={game.isHost}
            onStartGame={game.startGame}
            onLeave={game.leaveRoom}
            error={game.error}
          />
        )}

        {/* ── COUNTDOWN: 3, 2, 1... ── */}
        {game.phase === 'countdown' && (
          <CountdownOverlay
            key="countdown"
            value={game.countdownValue}
            isDark={isDark}
          />
        )}

        {/* ── PLAYING: Jogo ao vivo ── */}
        {game.phase === 'playing' && (
          <GroupGamePlay
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
          />
        )}

        {/* ── RESULTS: Tela final ── */}
        {game.phase === 'results' && (
          <GroupGameResults
            key="results"
            isDark={isDark}
            roomData={game.roomData}
            sortedPlayers={game.sortedPlayers}
            onLeave={() => {
              game.leaveRoom();
              setView('dashboard');
            }}
            updateProgress={updateProgress}
          />
        )}

      </AnimatePresence>
    </div>
  );
};
