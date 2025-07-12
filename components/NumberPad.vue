<template>
	<UCard
		variant="outline"
		:ui="{
			root: 'border border-gray-600 ring-gray-800 bg-gray-800 text-white',
			header: 'border-b border-gray-600 py-3',
			body: 'p-4 sm:p-4',
		}" class="">
		<template #header>
			<div class="flex items-center">
				<h3 v-if="!selectedValue" class="text-base font-semibold ">Enter Points</h3>
				<h3 v-if="selectedValue" class="text-base font-semibold mr-2">Tap a Color to Add:</h3>
				<UBadge v-if="selectedValue" color="neutral" variant="solid" class="bg-white text-gray-800">
					{{ selectedValue }}
				</UBadge>
			</div>
		</template>

		<!-- Number grid -->
		<div class="grid grid-cols-3 gap-3 mb-3">
			<UButton
				v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
				:key="num"
				variant="outline"
				size="xl"
				color="neutral"
				class="aspect-square rounded-full flex items-center	justify-center text-2xl bg-gray-800 hover:bg-gray-600 text-white border border-gray-600 ring-gray-800"
				@click="addDigit(num)"
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
				class="aspect-square rounded-full flex items-center justify-center text-3xl bg-gray-800 hover:bg-gray-600 text-white border border-gray-600 ring-gray-800"
			>
				0
			</UButton>
			<UButton
				@click="clear"
				variant="soft"
				size="xl"
				color="neutral"
				class="aspect-square rounded-full flex items-center	justify-center text-3xl bg-gray-800 hover:bg-gray-600 text-white border border-gray-600 ring-gray-800"
			>
				<UIcon name="i-heroicons-backspace" />
			</UButton>
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
