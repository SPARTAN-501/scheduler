import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace === true) {
      let newHistory = [...history];
      newHistory.pop();
      newHistory.push(mode);
      setHistory(newHistory);
    }
    else {
      let newHistory = [...history];
      newHistory.push(mode);
      setHistory(newHistory);
    }
  }

  function back() {
    let oldHistory = [...history];
    if (oldHistory.length > 1) {
      oldHistory.pop();
    }
    setHistory(oldHistory);
  }

  return { mode: history[history.length - 1], transition, back };
}