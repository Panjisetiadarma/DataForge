<template>
  <div class="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans">
    <!-- Navbar Header -->
    <header class="border-b border-gray-800 bg-[#0E1322]/80 backdrop-blur sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/20">
            D
          </div>
          <div>
            <h1 class="text-lg font-bold bg-gradient-to-r from-white via-gray-200 to-indigo-300 bg-clip-text text-transparent">
              DataForge
            </h1>
            <p class="text-xs text-gray-400">Zero to Certified Data Engineer Platform</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center space-x-1 sm:space-x-2 bg-gray-900/60 p-1.5 rounded-xl border border-gray-800 text-sm font-medium">
          <button 
            @click="activeTab = 'curriculum'"
            :class="activeTab === 'curriculum' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-gray-400 hover:text-white'"
            class="px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5"
          >
            <span>📚 Kurikulum Praktis</span>
          </button>
          <button 
            @click="activeTab = 'certifications'"
            :class="activeTab === 'certifications' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-gray-400 hover:text-white'"
            class="px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5"
          >
            <span>🎓 Peta Sertifikasi</span>
          </button>
          <button 
            @click="activeTab = 'simulator'"
            :class="activeTab === 'simulator' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'text-gray-400 hover:text-white'"
            class="px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5"
          >
            <span>⚡ Uji Sertifikasi (Simulasi)</span>
          </button>
        </nav>

        <!-- Progress Tracker Badge -->
        <div class="hidden md:flex items-center space-x-3 bg-gray-900/90 border border-gray-800 px-3.5 py-1.5 rounded-xl">
          <div class="text-right">
            <div class="text-xs text-gray-400">Progres Belajar</div>
            <div class="text-sm font-bold text-indigo-400">{{ completedCount }} / {{ ROADMAP_MODULES.length }} Modul Tuntas</div>
          </div>
          <div class="w-10 h-10 rounded-full border-2 border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300">
            {{ Math.round((completedCount / ROADMAP_MODULES.length) * 100) }}%
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <!-- HERO BANNER -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/40 via-gray-900/40 to-transparent border border-indigo-500/20 p-6 sm:p-10 mb-10 shadow-2xl">
        <div class="max-w-3xl">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
            <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Target Industri 2026: Modern Data Stack & Cloud Lakehouse</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Kuasai <span class="bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">Data Engineering</span> dari Nol sampai Lolos Sertifikasi Global.
          </h2>
          <p class="mt-3 text-base text-gray-300 leading-relaxed">
            Metode pembelajaran berbasis <strong class="text-white">Analogi Dunia Nyata</strong>, konsep industri relevan (SQL Window Functions, Parquet, Medallion Architecture, Airflow, Spark, Kafka), serta simulasi ujian sertifikasi resmi Azure, AWS, dan Databricks.
          </p>
        </div>
      </div>

      <!-- TAB 1: CURRICULUM ROADMAP -->
      <section v-if="activeTab === 'curriculum'" class="space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-white">Roadmap Bertingkat: 6 Pilar Data Engineering</h3>
            <p class="text-sm text-gray-400">Dirancang berurutan dari fondasi hingga komputasi terdistribusi skala petabyte.</p>
          </div>
          <button 
            @click="resetProgress" 
            class="text-xs text-gray-500 hover:text-gray-300 underline"
          >
            Reset Progres
          </button>
        </div>

        <div class="grid grid-cols-1 gap-6">
          <div 
            v-for="mod in ROADMAP_MODULES" 
            :key="mod.id"
            class="bg-gray-900/80 border rounded-2xl p-6 transition-all duration-200"
            :class="isCompleted(mod.id) ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-gray-800 hover:border-indigo-500/30'"
          >
            <!-- Card Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800/80">
              <div class="flex items-start space-x-3.5">
                <div class="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-base shrink-0 mt-0.5 border border-indigo-500/30">
                  {{ mod.id }}
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs px-2.5 py-0.5 rounded-full font-semibold" :class="isCompleted(mod.id) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'">
                      {{ mod.badge }}
                    </span>
                    <span v-if="isCompleted(mod.id)" class="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                      <span>✓ Tuntas Dipelajari</span>
                    </span>
                  </div>
                  <h4 class="text-lg font-bold text-white mt-1">{{ mod.title }}</h4>
                  <p class="text-xs text-gray-400">{{ mod.subtitle }}</p>
                </div>
              </div>

              <!-- Action Button -->
              <div class="flex items-center space-x-3">
                <button 
                  @click="toggleComplete(mod.id)"
                  :class="isCompleted(mod.id) ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30' : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700'"
                  class="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5"
                >
                  <span>{{ isCompleted(mod.id) ? '✓ Selesai' : 'Tandai Selesai' }}</span>
                </button>
                <button 
                  @click="toggleExpand(mod.id)"
                  class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20"
                >
                  <span>{{ expandedModule === mod.id ? 'Tutup Materi' : 'Buka Materi Lengkap' }}</span>
                </button>
              </div>
            </div>

            <!-- Analogi Cepat -->
            <div class="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-sm flex items-start space-x-2.5">
              <span class="text-base shrink-0">💡</span>
              <div>
                <strong class="text-amber-300">Analogi Cepat:</strong> {{ mod.analogy }}
              </div>
            </div>

            <!-- EXPANDED CONTENT -->
            <div v-if="expandedModule === mod.id" class="mt-6 space-y-6 pt-4 border-t border-gray-800">
              <!-- Summary -->
              <div>
                <h5 class="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Mengapa Materi Ini Krusial?</h5>
                <p class="text-sm text-gray-300 leading-relaxed">{{ mod.summary }}</p>
              </div>

              <!-- Key Concepts Grid -->
              <div>
                <h5 class="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Konsep Kunci Standar Sertifikasi</h5>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div 
                    v-for="(concept, cIdx) in mod.keyConcepts" 
                    :key="cIdx"
                    class="bg-gray-950/60 p-4 rounded-xl border border-gray-800/80"
                  >
                    <div class="font-bold text-indigo-300 text-sm mb-1">{{ concept.title }}</div>
                    <div class="text-xs text-gray-400 leading-relaxed">{{ concept.desc }}</div>
                  </div>
                </div>
              </div>

              <!-- Code Snippet -->
              <div v-if="mod.codeSnippet">
                <div class="flex items-center justify-between mb-2">
                  <h5 class="text-sm font-bold text-gray-300 uppercase tracking-wider">{{ mod.codeSnippet.title }}</h5>
                  <span class="text-xs uppercase font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300">{{ mod.codeSnippet.lang }}</span>
                </div>
                <div class="relative bg-gray-950 rounded-xl p-4 border border-gray-800 overflow-x-auto text-xs font-mono text-gray-300 leading-relaxed">
                  <pre><code>{{ mod.codeSnippet.code }}</code></pre>
                </div>
              </div>

              <!-- Practice Task -->
              <div class="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
                <div class="text-xs uppercase tracking-wider text-indigo-400 font-bold mb-1">🎯 Latihan Mandiri (Hands-on Challenge)</div>
                <p class="text-xs text-gray-300 leading-relaxed">{{ mod.practiceTask }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TAB 2: CERTIFICATIONS -->
      <section v-if="activeTab === 'certifications'" class="space-y-8">
        <div>
          <h3 class="text-xl font-bold text-white">Peta Sertifikasi Data Engineer Global</h3>
          <p class="text-sm text-gray-400">Pilih sertifikasi yang sesuai dengan jenjang karier dan target industri yang kamu incar.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="cert in CERTIFICATIONS" 
            :key="cert.id"
            class="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {{ cert.provider }}
                </span>
                <span class="text-xs font-medium text-emerald-400">{{ cert.level }}</span>
              </div>
              <h4 class="text-lg font-bold text-white mt-1">{{ cert.name }}</h4>
              <p class="text-xs text-gray-400 mt-2 leading-relaxed">{{ cert.description }}</p>
              
              <div class="mt-4">
                <div class="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Topik Kunci yang Diuji:</div>
                <ul class="space-y-1.5">
                  <li v-for="(skill, sIdx) in cert.skillsTested" :key="sIdx" class="text-xs text-gray-400 flex items-start space-x-2">
                    <span class="text-indigo-400 shrink-0">▸</span>
                    <span>{{ skill }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
              <div>Perkiraan Biaya Ujian: <span class="text-white font-semibold">{{ cert.cost }}</span></div>
            </div>
          </div>
        </div>
      </section>

      <!-- TAB 3: MOCK EXAM SIMULATOR -->
      <section v-if="activeTab === 'simulator'" class="space-y-8 max-w-3xl mx-auto">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white">Simulasi Ujian Sertifikasi Data Engineer</h3>
          <p class="text-sm text-gray-400 mt-1">Uji pemahaman konseptualmu terhadap skenario industri nyata.</p>
        </div>

        <!-- Question Card -->
        <div v-if="currentQuestionIndex < MOCK_EXAM_QUESTIONS.length" class="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div class="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3">
            <span class="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
              {{ currentQ.category }}
            </span>
            <span>Pertanyaan {{ currentQuestionIndex + 1 }} dari {{ MOCK_EXAM_QUESTIONS.length }}</span>
          </div>

          <p class="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {{ currentQ.question }}
          </p>

          <!-- Choices -->
          <div class="space-y-3">
            <button
              v-for="(opt, oIdx) in currentQ.options"
              :key="oIdx"
              @click="selectOption(oIdx)"
              :disabled="answered"
              :class="getOptionClass(oIdx)"
              class="w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start space-x-3"
            >
              <span class="w-6 h-6 rounded-full border flex items-center justify-center font-mono text-xs shrink-0" :class="selectedOption === oIdx ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-gray-700 text-gray-400'">
                {{ ['A', 'B', 'C', 'D'][oIdx] }}
              </span>
              <span class="flex-1 leading-snug">{{ opt }}</span>
            </button>
          </div>

          <!-- Explanation box -->
          <div v-if="answered" class="p-4 rounded-xl bg-gray-950 border text-xs leading-relaxed" :class="selectedOption === currentQ.correctIndex ? 'border-emerald-500/30 text-emerald-200' : 'border-rose-500/30 text-rose-200'">
            <div class="font-bold text-sm mb-1 flex items-center space-x-1.5">
              <span>{{ selectedOption === currentQ.correctIndex ? '🎉 Jawaban Tepat!' : '❌ Jawaban Kurang Tepat' }}</span>
            </div>
            <p>{{ currentQ.explanation }}</p>
          </div>

          <!-- Next Button -->
          <div v-if="answered" class="pt-2 flex justify-end">
            <button 
              @click="nextQuestion"
              class="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              {{ currentQuestionIndex === MOCK_EXAM_QUESTIONS.length - 1 ? 'Lihat Skor Akhir' : 'Lanjut ke Soal Berikutnya →' }}
            </button>
          </div>
        </div>

        <!-- Result Card -->
        <div v-else class="bg-gray-900/90 border border-gray-800 rounded-3xl p-8 text-center space-y-6">
          <div class="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-3xl mx-auto">
            🏆
          </div>
          <h4 class="text-2xl font-extrabold text-white">Simulasi Selesai!</h4>
          <p class="text-gray-300 text-sm">
            Skor kamu: <span class="text-2xl font-bold text-indigo-400">{{ examScore }}</span> dari {{ MOCK_EXAM_QUESTIONS.length }} Soal Benar ({{ Math.round((examScore / MOCK_EXAM_QUESTIONS.length) * 100) }}%)
          </p>
          <div class="p-4 rounded-2xl bg-gray-950 border border-gray-800 text-xs text-gray-400 text-left max-w-md mx-auto leading-relaxed">
            <strong class="text-gray-200 block mb-1">Rekomendasi Langkah Berikutnya:</strong>
            Fokuskan latihan pada modul-modul yang jawabannya sempat keliru, terutama konsep partisi kolom Parquet dan Medallion Lakehouse.
          </div>
          <button 
            @click="restartExam"
            class="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            Ulangi Simulasi Ujian
          </button>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-800/80 bg-gray-950/60 py-6 text-center text-xs text-gray-500">
      <div class="max-w-7xl mx-auto px-4">
        DataForge — Dedicated Learning Hub for Panji Setiadarma • Built with Vue 3 & Vite • Ready for Vercel Deployment
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ROADMAP_MODULES, CERTIFICATIONS, MOCK_EXAM_QUESTIONS } from './data/curriculum.js'

const activeTab = ref('curriculum')
const expandedModule = ref(1)
const completedModules = ref(new Set([1]))

// Load saved progress from localStorage if available
try {
  const saved = localStorage.getItem('dataforge_progress')
  if (saved) {
    completedModules.value = new Set(JSON.parse(saved))
  }
} catch (e) {}

const isCompleted = (id) => completedModules.value.has(id)

const toggleComplete = (id) => {
  if (completedModules.value.has(id)) {
    completedModules.value.delete(id)
  } else {
    completedModules.value.add(id)
  }
  try {
    localStorage.setItem('dataforge_progress', JSON.stringify(Array.from(completedModules.value)))
  } catch (e) {}
}

const toggleExpand = (id) => {
  expandedModule.value = expandedModule.value === id ? null : id
}

const resetProgress = () => {
  completedModules.value.clear()
  try {
    localStorage.removeItem('dataforge_progress')
  } catch (e) {}
}

const completedCount = computed(() => completedModules.value.size)

// Mock Exam State
const currentQuestionIndex = ref(0)
const selectedOption = ref(null)
const answered = ref(false)
const examScore = ref(0)

const currentQ = computed(() => MOCK_EXAM_QUESTIONS[currentQuestionIndex.value])

const selectOption = (index) => {
  if (answered.value) return
  selectedOption.value = index
  answered.value = true
  if (index === currentQ.value.correctIndex) {
    examScore.value++
  }
}

const getOptionClass = (index) => {
  if (!answered.value) {
    return 'bg-gray-950/60 hover:bg-gray-800/60 border-gray-800 text-gray-200'
  }
  if (index === currentQ.value.correctIndex) {
    return 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-semibold'
  }
  if (index === selectedOption.value) {
    return 'bg-rose-950/40 border-rose-500/60 text-rose-300'
  }
  return 'bg-gray-950/40 border-gray-800/60 text-gray-500 opacity-60'
}

const nextQuestion = () => {
  selectedOption.value = null
  answered.value = false
  currentQuestionIndex.value++
}

const restartExam = () => {
  currentQuestionIndex.value = 0
  selectedOption.value = null
  answered.value = false
  examScore.value = 0
}
</script>
