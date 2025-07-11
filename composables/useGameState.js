export const useGameState = () => {
	const STORAGE_KEY = 'cross-cribbage-game-state'

	// Load initial state from localStorage
	const getInitialState = () => {
		if (import.meta.client) {
			try {
				const savedState = localStorage.getItem(STORAGE_KEY)
				if (savedState) {
					const state = JSON.parse(savedState)
					return {
						player1Score: state.player1Score || 0,
						player2Score: state.player2Score || 0
					}
				}
			} catch (error) {
				console.warn('Failed to load game state from localStorage:', error)
			}
		}
		return { player1Score: 0, player2Score: 0 }
	}

	const initialState = getInitialState()

	// Game state - initialize with saved values
	const player1Score = ref(initialState.player1Score)
	const player2Score = ref(initialState.player2Score)
	const selectedValue = ref(null)
	const lastAction1 = ref(null)
	const lastAction2 = ref(null)

	// Load from localStorage (for manual refresh if needed)
	const loadGameState = () => {
		if (import.meta.client) {
			try {
				const savedState = localStorage.getItem(STORAGE_KEY)
				if (savedState) {
					const state = JSON.parse(savedState)
					player1Score.value = state.player1Score || 0
					player2Score.value = state.player2Score || 0
					// Don't restore selectedValue or lastActions - those should start fresh
				}
			} catch (error) {
				console.warn('Failed to load game state from localStorage:', error)
			}
		}
	}

	// Save to localStorage
	const saveGameState = () => {
		if (import.meta.client) {
			try {
				const state = {
					player1Score: player1Score.value,
					player2Score: player2Score.value,
					timestamp: Date.now()
				}
				localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
			} catch (error) {
				console.warn('Failed to save game state to localStorage:', error)
			}
		}
	}

	// Watch for changes and auto-save
	watch([player1Score, player2Score], () => {
		saveGameState()
	})

	// Methods
	const adjustScore = (player, amount) => {
		if (player === 1) {
			const oldScore = player1Score.value
			player1Score.value = Math.max(0, player1Score.value + amount)
			lastAction1.value = player1Score.value - oldScore
		} else {
			const oldScore = player2Score.value
			player2Score.value = Math.max(0, player2Score.value + amount)
			lastAction2.value = player2Score.value - oldScore
		}
	}

	const addSelectedToPlayer = (player) => {
		if (!selectedValue.value) return

		adjustScore(player, selectedValue.value)
		selectedValue.value = null
	}

	const undoLastAction = (player) => {
		if (player === 1 && lastAction1.value !== null) {
			player1Score.value = Math.max(0, player1Score.value - lastAction1.value)
			lastAction1.value = null
		} else if (player === 2 && lastAction2.value !== null) {
			player2Score.value = Math.max(0, player2Score.value - lastAction2.value)
			lastAction2.value = null
		}
	}

	const clearSelectedValue = () => {
		selectedValue.value = null
	}

	const resetScores = () => {
		player1Score.value = 0
		player2Score.value = 0
		selectedValue.value = null
		lastAction1.value = null
		lastAction2.value = null
		// Also clear from localStorage
		if (import.meta.client) {
			localStorage.removeItem(STORAGE_KEY)
		}
	}

	// Initialize immediately (no need to wait for onMounted)
	// The initial state is already loaded above

	return {
		// State
		player1Score,
		player2Score,
		selectedValue,
		lastAction1,
		lastAction2,

		// Methods
		adjustScore,
		addSelectedToPlayer,
		undoLastAction,
		clearSelectedValue,
		resetScores,
		loadGameState,
		saveGameState
	}
}
