<template>
	<UApp>
		<div class="min-h-screen bg-gray-800 text-white p-4">
			<div class="mx-auto max-w-xs space-y-6">
				<!-- Header -->
				<div class="text-center">
					<h1 class="text-3xl font-bold">
						Cross Cribbage
					</h1>
					<p class="opacity-75 text-sm mt-1">Score Keeper</p>
				</div>

				<!-- Player Panels -->
				<div class="flex flex-wrap -mx-2">
					<div class="w-1/2 aspect-square relative px-2">
						<PlayerCard
							:score="player1Score"
							:last-action="lastAction1"
							:is-highlighted="!!selectedValue"
							color-scheme="purple"
							@add-score="addSelectedToPlayer(1)"
							@increment="adjustScore(1, 1)"
							@decrement="adjustScore(1, -1)"
							@undo="undoLastAction(1)"
						/>
					</div>
					<div class="w-1/2 aspect-square relative px-2">
						<PlayerCard
							:score="player2Score"
							:last-action="lastAction2"
							:is-highlighted="!!selectedValue"
							color-scheme="green"
							@add-score="addSelectedToPlayer(2)"
							@increment="adjustScore(2, 1)"
							@decrement="adjustScore(2, -1)"
							@undo="undoLastAction(2)"
						/>
					</div>
				</div>

				<!-- Number Pad -->
				<NumberPad
					v-model:selected-value="selectedValue"
					@confirm="clearSelectedValue"
				/>

				<!-- Reset Button -->
				<div class="text-center">
					<UButton
						@click="resetScores"
						color="gray"
						variant="soft"
						size="lg"
					>
						<UIcon name="i-heroicons-arrow-path" class="mr-2" />
						Reset Game
					</UButton>
				</div>
			</div>
		</div>
	</UApp>
</template>

<script setup>
// Use the game state composable
const {
	player1Score,
	player2Score,
	selectedValue,
	lastAction1,
	lastAction2,
	adjustScore,
	addSelectedToPlayer,
	undoLastAction,
	clearSelectedValue,
	resetScores
} = useGameState()

// Set page title
useHead({
	title: 'Cross Cribbage Scorer'
})
</script>
