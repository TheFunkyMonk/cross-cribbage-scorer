<template>
	<UCard>
		<template #header>
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-semibold">Enter Points</h3>
				<UBadge v-if="selectedValue" color="primary" variant="solid">
					{{ selectedValue }}
				</UBadge>
			</div>
		</template>

		<!-- Display current value -->
		<div class="mb-4">
			<div class="text-center">
				<div class="text-2xl font-mono bg-gray-50 border rounded-lg p-3 min-h-[3rem] flex items-center justify-center">
					{{ displayValue }}
				</div>
			</div>
		</div>

		<!-- Number grid -->
		<div class="grid grid-cols-3 gap-2 mb-4">
			<UButton
				v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
				:key="num"
				@click="addDigit(num)"
				variant="outline"
				size="lg"
				class="aspect-square"
			>
				{{ num }}
			</UButton>
		</div>

		<!-- Bottom row: 0, Clear, Enter -->
		<div class="grid grid-cols-3 gap-2">
			<UButton
				@click="addDigit(0)"
				variant="outline"
				size="lg"
				class="aspect-square"
			>
				0
			</UButton>
			<UButton
				@click="clear"
				variant="soft"
				color="red"
				size="lg"
				class="aspect-square"
			>
				<UIcon name="i-heroicons-backspace" />
			</UButton>
			<UButton
				@click="enter"
				variant="solid"
				color="green"
				size="lg"
				class="aspect-square"
				:disabled="!selectedValue"
			>
				<UIcon name="i-heroicons-check" />
			</UButton>
		</div>

		<div v-if="selectedValue" class="mt-4 text-center text-sm text-gray-600">
			Tap a player to add {{ selectedValue }} points
		</div>
	</UCard>
</template>

<script setup>
const props = defineProps({
	selectedValue: {
		type: Number,
		default: null
	}
})

const emit = defineEmits(['update:selectedValue', 'confirm'])

const displayValue = computed(() => {
	return props.selectedValue?.toString() || '0'
})

const addDigit = (digit) => {
	const current = props.selectedValue || 0
	const newValue = current * 10 + digit

	// Limit to reasonable scores (0-999)
	if (newValue <= 999) {
		emit('update:selectedValue', newValue)
	}
}

const clear = () => {
	emit('update:selectedValue', null)
}

const enter = () => {
	if (props.selectedValue) {
		emit('confirm', props.selectedValue)
	}
}
</script>
