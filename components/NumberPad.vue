<template>
	<UCard>
		<template #header>
			<div class="flex items-center justify-between px-1">
				<h3 v-if="!selectedValue" class="text-base font-semibold">Enter Points</h3>
				<h3 v-if="selectedValue" class="text-base font-semibold">Tap a Color to Add</h3>
				<UBadge v-if="selectedValue" color="neutral" variant="solid">
					{{ selectedValue }}
				</UBadge>
			</div>
		</template>

		<!-- Number grid -->
		<div class="grid grid-cols-3 gap-3 mb-3">
			<UButton
				v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
				:key="num"
				@click="addDigit(num)"
				variant="outline"
				size="xl"
				color="neutral"
				class="aspect-square rounded-full flex items-center	justify-center text-3xl"
			>
				{{ num }}
			</UButton>
		</div>

		<!-- Bottom row: 0, Clear, Enter -->
		<div class="grid grid-cols-3 gap-3">
			<div></div> <!-- Empty space for alignment -->
			<UButton
				@click="addDigit(0)"
				variant="outline"
				size="xl"
				color="neutral"
				class="aspect-square rounded-full flex items-center justify-center text-3xl"
			>
				0
			</UButton>
			<UButton
				@click="clear"
				variant="soft"
				size="xl"
				color="neutral"
				class="aspect-square rounded-full flex items-center	justify-center text-3xl"
			>
				<UIcon name="i-heroicons-backspace" />
			</UButton>
		</div>

		<div v-if="selectedValue" class="mt-4 text-center text-xs text-gray-400">
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
