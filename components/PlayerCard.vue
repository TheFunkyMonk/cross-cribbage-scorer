<template>
	<UCard
		:class="cardClasses"
		:ui="{
			root: 'w-full flex items-stretch',
			header: 'w-full flex items-stretch',
			body: 'p-4 sm:p-4',
		}"
		@click="$emit('addScore')"
	>
		<div class="w-full relative flex flex-col h-full justify-between">
			<div class="text-6xl font-bold leading-none -mt-1">{{ score }}</div>
			<div v-if="lastAction !== null && lastAction !== 0" class="-mb-2 w-full flex justify-center">
				<UButton
					:color="colorScheme"
					variant="soft"
					class=""
					size="sm"
					@click.stop="$emit('undo')"
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
