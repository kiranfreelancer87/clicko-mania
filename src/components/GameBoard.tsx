import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementScore, recordGameResult, resetGame } from '../store/gameState/actions';
import './GameBoard.css';
import { RootState } from '../store/gameState/types';

const colors = ['red', 'blue', 'green'];
const gridRows = 10;
const gridCols = 10;

const createRandomGrid = (): (string | null)[][] =>
    Array.from({ length: gridRows }, () =>
        Array(gridCols)
            .fill(null)
            .map(() => colors[Math.floor(Math.random() * colors.length)])
    );

const GameBoard: React.FC = () => {
    const dispatch = useDispatch();
    const score = useSelector((state: RootState) => state.gameState.score);

    // State to track the game grid
    const [grid, setGrid] = useState(createRandomGrid);

    // useEffect to check for game win or game lost conditions
    useEffect(() => {
        // Check for game win after each move
        if (checkGameWin()) {
            dispatch(recordGameResult('win'));
            resetGame();
        }

        // Check for game lost after each move
        if (checkGameLost()) {
            dispatch(recordGameResult('lose'));
            resetGame();
        }
    }, [grid, dispatch]);

    // Function to handle cell click
    const handleCellClick = useCallback(
        (row: number, col: number) => {
            const clickedColor = grid[row][col];
            burstCells(grid, row, col, clickedColor);
            setGrid([...grid]);
            dispatch(incrementScore());
        },
        [grid, dispatch]
    );

    // Function to recursively burst cells of the same color
    const burstCells = (currentGrid: (string | null)[][], row: number, col: number, color: string | null) => {
        if (row < 0 || row >= gridRows || col < 0 || col >= gridCols || currentGrid[row][col] !== color) {
            return;
        }

        currentGrid[row][col] = null;

        burstCells(currentGrid, row - 1, col, color);
        burstCells(currentGrid, row + 1, col, color);
        burstCells(currentGrid, row, col - 1, color);
        burstCells(currentGrid, row, col + 1, color);
    };

    // Function to check for game win
    const checkGameWin = () => {
        return grid.every(row => row.every(cell => cell === null));
    };

    // Function to check for game lost
    const checkGameLost = () => {
        return !grid.some((row, rowIndex) =>
            row.some((cell, colIndex) => {
                if (cell === null) return false;

                const neighbors = [
                    grid[rowIndex - 1]?.[colIndex],
                    grid[rowIndex + 1]?.[colIndex],
                    grid[rowIndex]?.[colIndex - 1],
                    grid[rowIndex]?.[colIndex + 1],
                ];

                return neighbors.some(neighbor => neighbor === cell);
            })
        );
    };

    // Function to render a single cell
    const renderCell = (row: number, col: number) => (
        <div
            key={col}
            className={`cell ${grid[row][col] || 'empty'}`}
            onClick={() => handleCellClick(row, col)}
        ></div>
    );

    // Function to render a row of cells
    const renderRow = (row: number) => (
        <div key={row} className="row">
            {Array.from({ length: gridCols }, (_, col) => renderCell(row, col))}
        </div>
    );

    return (
        <div>
            <p>Score: {score}</p>
            <div className="game-board">
                {Array.from({ length: gridRows }, (_, row) => renderRow(row))}
            </div>
        </div>
    );
};

export default GameBoard;
