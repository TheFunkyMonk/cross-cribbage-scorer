<template>
	<UApp>
		<div class="min-h-screen bg-gray-50 p-4">
			<div class="mx-auto max-w-md space-y-6">
				<!-- Header -->
				<div class="text-center">
					<h1 class="text-3xl font-bold text-gray-900">
						Cross Cribbage
					</h1>
					<p class="text-gray-600 mt-2">Score Keeper</p>
				</div>

				<!-- Player Panels -->
				<div class="space-y-4">
					<!-- Player 1 -->
					<UCard
						:class="[
							'cursor-pointer transition-all duration-200',
							selectedValue ? 'ring-2 ring-blue-400 hover:ring-blue-500' : '',
							'bg-blue-500 text-white'
						]"
						@click="addSelectedToPlayer(1)"
					>
						<div class="flex items-center justify-between">
							<div>
								<h2 class="text-lg font-semibold">Player 1</h2>
								<div class="text-3xl font-bold mt-2">{{ player1Score }}</div>
							</div>
							<div class="flex flex-col space-y-2">
								<UButton
									@click.stop="adjustScore(1, 1)"
									color="blue"
									variant="solid"
									size="sm"
									square
								>
									<UIcon name="i-heroicons-plus" />
								</UButton>
								<UButton
									@click.stop="adjustScore(1, -1)"
									color="blue"
									variant="solid"
									size="sm"
									square
								>
									<UIcon name="i-heroicons-minus" />
								</UButton>
							</div>
						</div>
						<div v-if="lastAction1" class="mt-3 flex justify-center">
							<UButton
								@click.stop="undoLastAction(1)"
								color="blue"
								variant="soft"
								size="xs"
							>
								<UIcon name="i-heroicons-arrow-uturn-left" class="mr-1" />
								Undo {{ lastAction1 > 0 ? '+' : '' }}{{ lastAction1 }}
							</UButton>
						</div>
					</UCard>

					<!-- Player 2 -->
					<UCard
						:class="[
							'cursor-pointer transition-all duration-200',
							selectedValue ? 'ring-2 ring-red-400 hover:ring-red-500' : '',
							'bg-red-500 text-white'
						]"
						@click="addSelectedToPlayer(2)"
					>
						<div class="flex items-center justify-between">
							<div>
								<h2 class="text-lg font-semibold">Player 2</h2>
								<div class="text-3xl font-bold mt-2">{{ player2Score }}</div>
							</div>
							<div class="flex flex-col space-y-2">
								<UButton
									@click.stop="adjustScore(2, 1)"
									color="red"
									variant="solid"
									size="sm"
									square
								>
									<UIcon name="i-heroicons-plus" />
								</UButton>
								<UButton
									@click.stop="adjustScore(2, -1)"
									color="red"
									variant="solid"
									size="sm"
									square
								>
									<UIcon name="i-heroicons-minus" />
								</UButton>
							</div>
						</div>
						<div v-if="lastAction2" class="mt-3 flex justify-center">
							<UButton
								@click.stop="undoLastAction(2)"
								color="red"
								variant="soft"
								size="xs"
							>
								<UIcon name="i-heroicons-arrow-uturn-left" class="mr-1" />
								Undo {{ lastAction2 > 0 ? '+' : '' }}{{ lastAction2 }}
							</UButton>
						</div>
					</UCard>
				</div>

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

				<!-- Number Pad -->
				<NumberPad
					v-model:selected-value="selectedValue"
					@confirm="clearSelectedValue"
				/>

				<!-- Storage indicator (optional - shows when data is persisted) -->
				<div class="text-center text-xs text-gray-500 mt-4">
					Scores automatically saved
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
