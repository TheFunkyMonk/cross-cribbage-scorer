<template>
	<UCard
		:class="cardClasses"
		@click="$emit('addScore')"
	>
		<div class="w-full relative flex items-center aspect-square">
			<div class="w-full flex items-center justify-between">
				<div>
					<div class="text-6xl font-bold leading-none -mt-1">{{ score }}</div>
				</div>
				<!-- <div class="flex flex-col">
					<UButton
						@click.stop="$emit('increment')"
						:color="colorScheme"
						variant="solid"
						size="sm"
						class="-mr-2"
						square
					>
						<UIcon name="i-heroicons-plus" class="text-lg my-1" />
					</UButton>
					<UButton
						@click.stop="$emit('decrement')"
						:color="colorScheme"
						variant="solid"
						size="sm"
						class="-mr-2"
						square
					>
						<UIcon name="i-heroicons-minus" class="text-lg my-1" />
					</UButton>
				</div> -->
			</div>
			<div v-if="lastAction !== null && lastAction !== 0" class="absolute bottom-0 left-0 -mb-2 w-full flex justify-center">
				<UButton
					@click.stop="$emit('undo')"
					:color="colorScheme"
					variant="soft"
					class="-mb-1"
					size="sm"
				>
					<UIcon name="i-heroicons-arrow-uturn-left" class="" />
					Undo {{ lastAction > 0 ? '+' : '' }}{{ lastAction }}
				</UButton>
			</div>
		</div>
	</UCard>
</template>

<script setup>
const props = defineProps({
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
		'text-white',
		'border-none',
		'ring-0'
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
	// const ringClasses = {
	// 	blue: 'ring-blue-400 hover:ring-blue-500',
	// 	red: 'ring-red-400 hover:ring-red-500',
	// 	green: 'ring-green-400 hover:ring-green-500',
	// 	yellow: 'ring-yellow-400 hover:ring-yellow-500',
	// 	purple: 'ring-purple-400 hover:ring-purple-500',
	// 	pink: 'ring-pink-400 hover:ring-pink-500',
	// 	gray: 'ring-gray-400 hover:ring-gray-500'
	// }

	const classes = [
		...baseClasses,
		backgroundClasses[props.colorScheme]
	]

	// if (props.isHighlighted) {
	// 	classes.push('ring-2', ringClasses[props.colorScheme])
	// }

	return classes
})
</script>
