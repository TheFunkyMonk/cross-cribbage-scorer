<template>
	<UCard
		:class="cardClasses"
		@click="$emit('addScore')"
	>
		<div class="flex items-center justify-between w-full aspect-square">
			<div>
				<h2 class="text-lg font-semibold">{{ playerName }}</h2>
				<div class="text-3xl font-bold mt-2">{{ score }}</div>
			</div>
			<div class="flex flex-col space-y-2">
				<UButton
					@click.stop="$emit('increment')"
					:color="colorScheme"
					variant="solid"
					size="sm"
					square
				>
					<UIcon name="i-heroicons-plus" />
				</UButton>
				<UButton
					@click.stop="$emit('decrement')"
					:color="colorScheme"
					variant="solid"
					size="sm"
					square
				>
					<UIcon name="i-heroicons-minus" />
				</UButton>
			</div>
		</div>
		<div v-if="lastAction !== null && lastAction !== 0" class="mt-3 flex justify-center">
			<UButton
				@click.stop="$emit('undo')"
				:color="colorScheme"
				variant="soft"
				size="xs"
			>
				<UIcon name="i-heroicons-arrow-uturn-left" class="mr-1" />
				Undo {{ lastAction > 0 ? '+' : '' }}{{ lastAction }}
			</UButton>
		</div>
	</UCard>
</template>

<script setup>
const props = defineProps({
	playerName: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		default: 0
	},
	lastAction: {
		type: Number,
		default: null
	},
	colorScheme: {
		type: String,
		default: 'blue',
		validator: (value) => ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'gray'].includes(value)
	},
	isHighlighted: {
		type: Boolean,
		default: false
	}
})

defineEmits(['addScore', 'increment', 'decrement', 'undo'])

const cardClasses = computed(() => {
	const baseClasses = [
		'cursor-pointer',
		'transition-all',
		'duration-200',
		'text-white'
	]

	// Background color based on color scheme
	const backgroundClasses = {
		blue: 'bg-blue-500',
		red: 'bg-red-500',
		green: 'bg-green-500',
		yellow: 'bg-yellow-500',
		purple: 'bg-purple-500',
		pink: 'bg-pink-500',
		gray: 'bg-gray-500'
	}

	// Ring color for highlighting when value is selected
	const ringClasses = {
		blue: 'ring-blue-400 hover:ring-blue-500',
		red: 'ring-red-400 hover:ring-red-500',
		green: 'ring-green-400 hover:ring-green-500',
		yellow: 'ring-yellow-400 hover:ring-yellow-500',
		purple: 'ring-purple-400 hover:ring-purple-500',
		pink: 'ring-pink-400 hover:ring-pink-500',
		gray: 'ring-gray-400 hover:ring-gray-500'
	}

	const classes = [
		...baseClasses,
		backgroundClasses[props.colorScheme]
	]

	if (props.isHighlighted) {
		classes.push('ring-2', ringClasses[props.colorScheme])
	}

	return classes
})
</script>
