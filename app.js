(function () {
  "use strict";

  const books = window.STORY_BOOKS || [];
  const storageKeys = { language: "story-garden-language", favorites: "story-garden-favorites", progress: "story-garden-progress", size: "story-garden-text-size" };
  const copy = {
    en: {
      navLibrary: "My library", navFavorites: "My favorites", eyebrow: "A little reading magic", welcomeLine1: "Every story", welcomeLine2: "is a new adventure!",
      heroDescription: "Pick a cozy corner, choose a book, and let Ryan & Eva take you somewhere wonderful.", continueReading: "Continue reading", madeFor: "Made for curious little readers", caption: "Their next adventure is waiting…",
      theCollection: "The collection", chooseStory: "Choose your next story", searchLabel: "Search stories", searchPlaceholder: "Find a story…", sortLabel: "Sort stories", sortFeatured: "Featured", sortShortest: "Quick reads", sortAZ: "A to Z",
      filterAll: "All stories", filterDreamy: "Dreamy", filterNature: "Nature", filterBrave: "Little adventures", emptyState: "No stories here yet. Try another search!", grownupTitle: "A little note for grown-ups", grownupDescription: "Every story is made for reading together. Snuggle up, take your time, and let little questions bloom.", footerText: "Ryan & Eva's Story Garden", footerMade: "Made for little dreamers",
      bedtime: "A gentle bedtime read", readAloud: "A bright read-aloud", natureAdventure: "A tiny nature adventure", dreamy: "Dreamy", nature: "Nature", brave: "Adventure", minutes: "min read", startStory: "Read story", keepGoing: "Keep going", readAgain: "Read again", favorite: "Add to favorites", unfavorite: "Remove from favorites",
      back: "Back to library", english: "English", arabic: "Arabic", both: "Both", listen: "Read aloud", stopListening: "Stop reading", bigger: "Make text bigger", smaller: "Make text smaller", page: "Page", of: "of", previous: "Previous", next: "Next page", dragHint: "Swipe or drag the page edge to turn it", finish: "The end", finishedNote: "You finished this story! What a lovely adventure.", chatTogether: "Talk about the story", listeningUnavailable: "Read aloud is not available in this browser.", languageUnavailable: "This browser does not have a voice for that language.", savedFavorite: "Saved to your favorites", removedFavorite: "Removed from your favorites", textLarge: "Text is already at its largest size", textSmall: "Text is already at its smallest size", openStory: "Open story: ", short: "Quick read", medium: "Cozy read"
    },
    ar: {
      navLibrary: "مكتبتي", navFavorites: "قصصي المفضلة", eyebrow: "سحر القراءة الصغير", welcomeLine1: "كل حكاية", welcomeLine2: "مغامرة جديدة!", heroDescription: "اختر مكاناً دافئاً وكتاباً جميلاً، ودع ريان وإيفا يأخذانك إلى عالمٍ رائع.", continueReading: "تابع القراءة", madeFor: "للقرّاء الصغار المحبين للاستكشاف", caption: "مغامرتهما التالية بانتظاركما…",
      theCollection: "مجموعة الحكايات", chooseStory: "اختر حكايتك التالية", searchLabel: "ابحث في الحكايات", searchPlaceholder: "ابحث عن حكاية…", sortLabel: "ترتيب الحكايات", sortFeatured: "مختارة", sortShortest: "قراءات سريعة", sortAZ: "أ إلى ي",
      filterAll: "كل الحكايات", filterDreamy: "أحلام", filterNature: "الطبيعة", filterBrave: "مغامرات صغيرة", emptyState: "لا توجد حكايات هنا. جرّب بحثاً آخر!", grownupTitle: "ملاحظة صغيرة للكبار", grownupDescription: "كل حكاية أجمل حين نقرؤها معاً. اقتربوا، واقرؤوا على مهل، ودعوا الأسئلة الصغيرة تنمو.", footerText: "حديقة حكايات ريان وإيفا", footerMade: "للحالمين الصغار",
      bedtime: "حكاية هادئة قبل النوم", readAloud: "حكاية جميلة للقراءة", natureAdventure: "مغامرة صغيرة في الطبيعة", dreamy: "أحلام", nature: "الطبيعة", brave: "مغامرة", minutes: "دقائق", startStory: "اقرأ الحكاية", keepGoing: "تابع الحكاية", readAgain: "اقرأها مجدداً", favorite: "أضف إلى المفضلة", unfavorite: "أزل من المفضلة",
      back: "العودة إلى المكتبة", english: "الإنجليزية", arabic: "العربية", both: "اللغتان", listen: "استمع إلى الحكاية", stopListening: "أوقف القراءة", bigger: "كبّر الخط", smaller: "صغّر الخط", page: "الصفحة", of: "من", previous: "السابقة", next: "الصفحة التالية", dragHint: "اسحب طرف الصفحة لقلبها", finish: "النهاية", finishedNote: "أنهيت هذه الحكاية! يا لها من مغامرة جميلة.", chatTogether: "لنتحدث عن الحكاية", listeningUnavailable: "ميزة القراءة الصوتية غير متاحة في هذا المتصفح.", languageUnavailable: "لا يتوفر صوت بهذه اللغة في هذا المتصفح.", savedFavorite: "أُضيفت إلى المفضلة", removedFavorite: "أُزيلت من المفضلة", textLarge: "هذا أكبر حجم للخط", textSmall: "هذا أصغر حجم للخط", openStory: "افتح الحكاية: ", short: "قراءة سريعة", medium: "قراءة هادئة"
    }
  };

  const state = {
    language: readStorage(storageKeys.language, "en"),
    view: "library",
    filter: "all",
    query: "",
    sort: "featured",
    activeBookId: null,
    page: 0,
    readingMode: null,
    textSize: Number(readStorage(storageKeys.size, "0")) || 0,
    toastTimer: null
  };

  const grid = document.getElementById("book-grid");
  const reader = document.getElementById("reader-view");
  const home = document.getElementById("home-view");
  const toast = document.getElementById("toast");
  document.getElementById("year").textContent = new Date().getFullYear();

  function readStorage(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; }
  }

  function readObject(key, fallback) {
    try { return Object.assign(fallback, JSON.parse(localStorage.getItem(key) || "{}")); } catch (_) { return fallback; }
  }

  function writeStorage(key, value) {
    try { localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value)); } catch (_) { /* The app remains usable without browser storage. */ }
  }

  function getFavorites() { return readObject(storageKeys.favorites, {}); }
  function getProgress() { return readObject(storageKeys.progress, {}); }
  function text(key) { return (copy[state.language] || copy.en)[key] || copy.en[key] || key; }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }

  function translateStaticUI() {
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
    document.body.dir = state.language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-copy]").forEach(node => {
      const key = node.dataset.copy;
      if (text(key)) node.textContent = text(key);
    });
    document.querySelectorAll("[data-placeholder]").forEach(node => { node.placeholder = text(node.dataset.placeholder); });
    document.querySelectorAll("[data-language]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === state.language)));
    document.querySelectorAll("[data-view]").forEach(button => button.classList.toggle("is-active", button.dataset.view === state.view));
    const filterNames = { all: "filterAll", dreamy: "filterDreamy", nature: "filterNature", brave: "filterBrave" };
    document.querySelectorAll("[data-filter]").forEach(button => {
      button.classList.toggle("is-selected", button.dataset.filter === state.filter);
      button.setAttribute("aria-pressed", String(button.dataset.filter === state.filter));
      const label = button.querySelector("span:last-child");
      if (label) label.textContent = text(filterNames[button.dataset.filter]);
    });
    document.getElementById("search-books").value = state.query;
    document.getElementById("sort-books").value = state.sort;
    const sortSelect = document.getElementById("sort-books");
    sortSelect.querySelectorAll("option").forEach(option => { option.textContent = text(option.dataset.copy); });
  }

  function moodLabel(book) {
    if (state.language === "ar") return ({ dreamy: text("dreamy"), nature: text("nature"), brave: text("brave") })[book.mood];
    return ({ dreamy: text("dreamy"), nature: text("nature"), brave: text("brave") })[book.mood];
  }

  function bookThemeLabel(book) {
    if (book.id === "moonlight-picnic") return text("bedtime");
    if (book.id === "clouds-lost-rainbow") return text("readAloud");
    return text("natureAdventure");
  }

  function storySprite(book, index, imageAttributes = "") {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const rowTop = book.artRows[row];
    const rowHeight = book.artRows[row + 1] - rowTop;
    const imageHeight = (1536 / rowHeight) * 100;
    const imageTop = -(rowTop / rowHeight) * 100;
    const imageLeft = -(column * 100);
    return `<div class="story-sprite" style="--sprite-left:${imageLeft}%;--sprite-top:${imageTop}%;--sprite-height:${imageHeight}%"><img src="${escapeHtml(book.art)}" alt="" ${imageAttributes}></div>`;
  }

  function coverArt(book) {
    return `<div class="cover-art ${escapeHtml(book.cover)}" aria-hidden="true">
      <span class="cover-star star-a">✦</span><span class="cover-star star-b">✧</span><span class="cover-star star-c">✦</span>
      <div class="cover-image-window">${storySprite(book, 0)}</div>
    </div>`;
  }

  function renderBooks() {
    const favorites = getFavorites();
    const progress = getProgress();
    const query = state.query.trim().toLocaleLowerCase(state.language === "ar" ? "ar" : "en");
    let visible = books.filter(book => {
      const favored = Boolean(favorites[book.id]);
      if (state.view === "favorites" && !favored) return false;
      if (state.filter !== "all" && book.mood !== state.filter) return false;
      const title = book.title[state.language] || book.title.en;
      const description = book.description[state.language] || book.description.en;
      if (query && !`${title} ${description}`.toLocaleLowerCase().includes(query)) return false;
      return true;
    });
    if (state.sort === "shortest") visible = visible.slice().sort((a, b) => a.minutes - b.minutes);
    if (state.sort === "az") visible = visible.slice().sort((a, b) => a.title[state.language].localeCompare(b.title[state.language], state.language));

    grid.innerHTML = visible.map(book => {
      const title = book.title[state.language] || book.title.en;
      const description = book.description[state.language] || book.description.en;
      const saved = progress[book.id] || { page: 0, completed: false };
      const percent = saved.completed ? 100 : Math.min(96, Math.round(((saved.page || 0) / book.pages.length) * 100));
      const isFavorite = Boolean(favorites[book.id]);
      const dir = state.language === "ar" ? "rtl" : "ltr";
      const readAction = saved.completed ? text("readAgain") : saved.page > 0 ? text("keepGoing") : text("startStory");
      return `<article class="book-card" dir="${dir}">
        <button class="card-open" type="button" data-open-book="${escapeHtml(book.id)}" aria-label="${escapeHtml(text("openStory") + title)}">${coverArt(book)}
          <div class="card-content"><div class="card-topline"><span class="mood-label">${escapeHtml(bookThemeLabel(book))}</span></div>
          <h3 class="card-title">${escapeHtml(title)}</h3><p class="card-description">${escapeHtml(description)}</p>
          <div class="card-meta"><span>${book.minutes} ${escapeHtml(text("minutes"))}</span><span class="read-label">${escapeHtml(readAction)}</span></div>
          <div class="progress-track" aria-label="${percent}% read"><div class="progress-fill" style="width:${percent}%"></div></div></div>
        </button>
        <button class="favorite-button ${isFavorite ? "is-favorite" : ""}" type="button" data-favorite="${escapeHtml(book.id)}" aria-pressed="${isFavorite}" aria-label="${escapeHtml(isFavorite ? text("unfavorite") : text("favorite"))}">${isFavorite ? "♥" : "♡"}</button>
      </article>`;
    }).join("");
    document.getElementById("empty-state").hidden = visible.length > 0;
  }

  function sceneHTML(book, index) {
    return `<div class="page-art" aria-hidden="true">${storySprite(book, index, 'decoding="async"')}</div>`;
  }

  function getActiveBook() { return books.find(book => book.id === state.activeBookId); }

  function readerTextMarkup(book, page) {
    const mode = state.readingMode || state.language;
    if (mode === "both") {
      return `<div class="page-copy bilingual" style="--reader-size:${18 + state.textSize * 2}px"><div class="page-number">${escapeHtml(text("page"))} ${state.page + 1}</div><p lang="en" dir="ltr">${escapeHtml(page.en)}</p><p class="arabic-copy" lang="ar" dir="rtl">${escapeHtml(page.ar)}</p></div>`;
    }
    const lang = mode === "ar" ? "ar" : "en";
    return `<div class="page-copy" dir="${lang === "ar" ? "rtl" : "ltr"}" lang="${lang}" style="--reader-size:${20 + state.textSize * 2}px"><div class="page-number">${escapeHtml(text("page"))} ${state.page + 1}</div><p>${escapeHtml(page[lang])}</p></div>`;
  }

  function renderReader() {
    const book = getActiveBook();
    if (!book) { goHome(false); return; }
    const page = book.pages[state.page];
    const progress = getProgress();
    const isLast = state.page === book.pages.length - 1;
    const percent = Math.round(((state.page + 1) / book.pages.length) * 100);
    const currentMode = state.readingMode || state.language;
    const title = book.title[state.language] || book.title.en;
    const questions = currentMode === "ar" ? book.questions.ar : book.questions.en;
    reader.innerHTML = `<div class="reader-top">
        <button class="back-button" id="back-to-library" type="button"><span aria-hidden="true">${state.language === "ar" ? "→" : "←"}</span>${escapeHtml(text("back"))}</button>
        <div class="reader-tools" role="toolbar" aria-label="Reading tools">
          <div class="text-size-tools" aria-label="Text size"><button type="button" data-size="-1" aria-label="${escapeHtml(text("smaller"))}">A−</button><button type="button" data-size="1" aria-label="${escapeHtml(text("bigger"))}">A+</button></div>
          <button class="tool-button ${state.speaking ? "is-active" : ""}" id="listen-button" type="button">${state.speaking ? "◼ " + escapeHtml(text("stopListening")) : "♫ " + escapeHtml(text("listen"))}</button>
          <button class="tool-button ${currentMode === "en" ? "is-active" : ""}" type="button" data-reader-language="en">EN</button>
          <button class="tool-button ${currentMode === "ar" ? "is-active" : ""}" type="button" data-reader-language="ar">عربي</button>
          <button class="tool-button ${currentMode === "both" ? "is-active" : ""}" type="button" data-reader-language="both">EN + عربي</button>
        </div>
      </div>
      <div class="reader-heading"><p class="reader-kicker">${escapeHtml(bookThemeLabel(book))}</p><h1>${escapeHtml(title)}</h1><div class="reading-progress" aria-label="${percent}%"><span style="width:${percent}%"></span></div></div>
      <div class="book-page-frame"><article class="book-page" aria-label="${escapeHtml(text("page"))} ${state.page + 1} ${escapeHtml(text("of"))} ${book.pages.length}">${sceneHTML(book, state.page)}${readerTextMarkup(book, page)}<div class="page-curl" aria-hidden="true"></div></article></div>
      <div class="page-controls"><button class="page-button previous" id="previous-page" type="button" ${state.page === 0 ? "disabled" : ""}><span aria-hidden="true">${state.language === "ar" ? "→" : "←"}</span>${escapeHtml(text("previous"))}</button><span class="page-counter"><span>${escapeHtml(text("page"))} ${state.page + 1} ${escapeHtml(text("of"))} ${book.pages.length}</span><small class="drag-hint" data-copy="dragHint">${escapeHtml(text("dragHint"))}</small></span><button class="page-button" id="next-page" type="button">${escapeHtml(isLast ? text("finish") : text("next"))}<span aria-hidden="true">${state.language === "ar" ? "←" : "→"}</span></button></div>
      ${isLast ? `<div class="reader-finish">✦ ${escapeHtml(text("finishedNote"))} ✦</div><section class="story-questions" dir="${currentMode === "ar" ? "rtl" : "ltr"}"><h2>${escapeHtml(text("chatTogether"))}</h2><ol>${questions.map(question => `<li>${escapeHtml(question)}</li>`).join("")}</ol></section>` : ""}`;
    home.hidden = true;
    reader.hidden = false;
    translateStaticUI();
    reader.querySelector("#back-to-library").addEventListener("click", () => goHome(true));
    reader.querySelector("#previous-page").addEventListener("click", previousPage);
    reader.querySelector("#next-page").addEventListener("click", nextPage);
    attachPageGestures(reader.querySelector(".book-page"));
    reader.querySelector("#listen-button").addEventListener("click", toggleSpeech);
    reader.querySelectorAll("[data-reader-language]").forEach(button => button.addEventListener("click", () => {
      stopSpeech(); state.readingMode = button.dataset.readerLanguage; renderReader();
    }));
    reader.querySelectorAll("[data-size]").forEach(button => button.addEventListener("click", () => changeTextSize(Number(button.dataset.size))));
  }

  state.speaking = false;

  function saveProgress(completed) {
    const book = getActiveBook();
    if (!book) return;
    const progress = getProgress();
    const previous = progress[book.id] || { page: 0, completed: false };
    progress[book.id] = { page: Math.max(previous.page || 0, state.page + 1), completed: completed || previous.completed || false };
    writeStorage(storageKeys.progress, progress);
  }

  function previousPage() {
    if (state.page > 0) {
      stopSpeech();
      const turn = capturePageTurn("previous");
      state.page -= 1;
      renderReader();
      playPageTurn(turn);
    }
  }

  function nextPage() {
    const book = getActiveBook();
    if (!book) return;
    stopSpeech();
    if (state.page < book.pages.length - 1) {
      const turn = capturePageTurn("next");
      state.page += 1; saveProgress(false); renderReader();
      playPageTurn(turn);
    } else {
      saveProgress(true); renderReader(); showToast(text("finishedNote"));
    }
  }

  function capturePageTurn(direction) {
    const currentPage = reader.querySelector(".book-page");
    if (!currentPage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
    const frameRect = currentPage.parentElement.getBoundingClientRect();
    const pageRect = currentPage.getBoundingClientRect();
    const sheet = currentPage.cloneNode(true);
    sheet.classList.add("page-turn-sheet");
    sheet.setAttribute("aria-hidden", "true");
    sheet.inert = true;
    sheet.style.top = `${pageRect.top - frameRect.top}px`;
    sheet.style.left = `${pageRect.left - frameRect.left}px`;
    sheet.style.width = `${pageRect.width}px`;
    sheet.style.height = `${pageRect.height}px`;
    const rtl = document.documentElement.dir === "rtl";
    const hingeLeft = direction === "next" ? !rtl : rtl;
    sheet.style.transformOrigin = hingeLeft ? "left center" : "right center";
    return { sheet, rotation: hingeLeft ? "-180deg" : "180deg" };
  }

  function playPageTurn(turn) {
    if (!turn) return;
    reader.querySelector(".book-page-frame").appendChild(turn.sheet);
    const tilt = turn.rotation.startsWith("-") ? "-18deg" : "18deg";
    const halfTurn = turn.rotation.startsWith("-") ? "-91deg" : "91deg";
    const animation = turn.sheet.animate([
      { transform: "perspective(1500px) rotateY(0deg)", filter: "brightness(1)", boxShadow: "0 6px 0 #e5d7b4, 0 15px 30px rgba(45,65,95,.09)" },
      { offset: .18, transform: `perspective(1500px) rotateY(${tilt})`, filter: "brightness(.94)" },
      { offset: .52, transform: `perspective(1500px) rotateY(${halfTurn})`, filter: "brightness(.78)" },
      { transform: `perspective(1500px) rotateY(${turn.rotation})`, filter: "brightness(.88)", boxShadow: "0 2px 0 #e5d7b4, 0 4px 10px rgba(45,65,95,.06)" }
    ], { duration: 620, easing: "cubic-bezier(.48,.02,.34,1)", fill: "forwards" });
    animation.onfinish = () => turn.sheet.remove();
    animation.oncancel = () => turn.sheet.remove();
  }

  function attachPageGestures(bookPage) {
    if (!bookPage) return;
    let gesture = null;

    function clearCurl() {
      bookPage.classList.remove("is-dragging-next", "is-dragging-previous");
      bookPage.style.removeProperty("--curl-progress");
    }

    function directionFromDrag(deltaX) {
      const isRtl = document.documentElement.dir === "rtl";
      return (deltaX < 0) !== isRtl ? "next" : "previous";
    }

    bookPage.addEventListener("pointerdown", event => {
      if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
      if (event.target.closest("img")) event.preventDefault();
      gesture = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, horizontal: false, cancelled: false };
      if (bookPage.setPointerCapture) bookPage.setPointerCapture(event.pointerId);
    });

    bookPage.addEventListener("dragstart", event => event.preventDefault());

    bookPage.addEventListener("pointermove", event => {
      if (!gesture || event.pointerId !== gesture.pointerId || gesture.cancelled) return;
      const deltaX = event.clientX - gesture.startX;
      const deltaY = event.clientY - gesture.startY;
      if (!gesture.horizontal) {
        if (Math.abs(deltaY) > 12 && Math.abs(deltaY) > Math.abs(deltaX)) { gesture.cancelled = true; return; }
        if (Math.abs(deltaX) < 8 || Math.abs(deltaX) < Math.abs(deltaY)) return;
        gesture.horizontal = true;
      }
      event.preventDefault();
      const direction = directionFromDrag(deltaX);
      const activeBook = getActiveBook();
      const canTurn = activeBook && (direction === "next" ? state.page < activeBook.pages.length - 1 : state.page > 0);
      if (!canTurn) { clearCurl(); return; }
      const progress = Math.min(1, Math.abs(deltaX) / (bookPage.clientWidth * .48));
      bookPage.style.setProperty("--curl-progress", String(progress));
      bookPage.classList.toggle("is-dragging-next", direction === "next");
      bookPage.classList.toggle("is-dragging-previous", direction === "previous");
    }, { passive: false });

    function finishGesture(event) {
      if (!gesture || event.pointerId !== gesture.pointerId) return;
      const deltaX = event.clientX - gesture.startX;
      const direction = directionFromDrag(deltaX);
      const shouldTurn = gesture.horizontal && !gesture.cancelled && Math.abs(deltaX) >= Math.max(72, bookPage.clientWidth * .16);
      clearCurl();
      gesture = null;
      if (shouldTurn) {
        if (direction === "next") nextPage();
        else previousPage();
      }
    }

    bookPage.addEventListener("pointerup", finishGesture);
    bookPage.addEventListener("pointercancel", event => {
      if (gesture && event.pointerId === gesture.pointerId) { clearCurl(); gesture = null; }
    });
  }

  function changeTextSize(change) {
    const next = Math.max(-2, Math.min(3, state.textSize + change));
    if (next === state.textSize) { showToast(text(change > 0 ? "textLarge" : "textSmall")); return; }
    state.textSize = next; writeStorage(storageKeys.size, String(next)); renderReader();
  }

  function toggleSpeech() {
    if (state.speaking) { stopSpeech(); renderReader(); return; }
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) { showToast(text("listeningUnavailable")); return; }
    const book = getActiveBook();
    if (!book) return;
    const mode = state.readingMode || state.language;
    const lang = mode === "ar" ? "ar" : "en";
    const utterance = new SpeechSynthesisUtterance(book.pages[state.page][lang]);
    utterance.lang = lang === "ar" ? "ar-SA" : "en-US";
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(item => item.lang.toLowerCase().startsWith(lang === "ar" ? "ar" : "en"));
    if (voices.length && !voice && lang === "ar") { showToast(text("languageUnavailable")); return; }
    if (voice) utterance.voice = voice;
    utterance.rate = 0.88;
    utterance.onend = () => { state.speaking = false; if (!reader.hidden) renderReader(); };
    utterance.onerror = () => { state.speaking = false; if (!reader.hidden) renderReader(); };
    state.speaking = true; renderReader(); window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    state.speaking = false;
  }

  function openBook(id, page) {
    const book = books.find(item => item.id === id);
    if (!book) return;
    stopSpeech();
    state.activeBookId = id;
    state.page = Math.max(0, Math.min(book.pages.length - 1, Number(page) || 0));
    state.readingMode = state.language;
    state.view = "library";
    const hash = `#book/${encodeURIComponent(id)}`;
    if (window.location.hash !== hash) window.location.hash = hash;
    else renderReader();
  }

  function goHome(updateHash) {
    stopSpeech();
    state.activeBookId = null;
    state.view = "library";
    if (updateHash && window.location.hash !== "#home") window.location.hash = "#home";
    reader.hidden = true; home.hidden = false;
    translateStaticUI(); renderBooks();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleHashChange() {
    const match = window.location.hash.match(/^#book\/(.+)$/);
    if (match) {
      const id = decodeURIComponent(match[1]);
      if (id !== state.activeBookId) {
        const progress = getProgress()[id];
        state.page = progress && !progress.completed ? progress.page || 0 : 0;
        openBook(id, state.page);
      } else renderReader();
      return;
    }
    if (state.activeBookId) goHome(false);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2300);
  }

  document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => {
    state.language = button.dataset.language;
    writeStorage(storageKeys.language, state.language);
    if (state.activeBookId) { state.readingMode = state.language; stopSpeech(); renderReader(); }
    else { translateStaticUI(); renderBooks(); }
  }));

  document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => {
    state.view = button.dataset.view;
    state.filter = "all";
    translateStaticUI(); renderBooks();
    if (state.view === "favorites" && window.matchMedia("(max-width: 680px)").matches) window.scrollTo({ top: document.querySelector(".library-section").offsetTop - 15, behavior: "smooth" });
  }));

  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    state.filter = button.dataset.filter; translateStaticUI(); renderBooks();
  }));

  document.getElementById("search-books").addEventListener("input", event => { state.query = event.target.value; renderBooks(); });
  document.getElementById("sort-books").addEventListener("change", event => { state.sort = event.target.value; renderBooks(); });
  document.getElementById("continue-reading").addEventListener("click", () => {
    const progress = getProgress();
    const book = books.find(item => progress[item.id] && !progress[item.id].completed) || books[0];
    if (book) openBook(book.id, progress[book.id] && !progress[book.id].completed ? progress[book.id].page || 0 : 0);
  });

  grid.addEventListener("click", event => {
    const openButton = event.target.closest("[data-open-book]");
    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) {
      const favorites = getFavorites();
      const id = favoriteButton.dataset.favorite;
      const wasFavorite = Boolean(favorites[id]);
      if (wasFavorite) delete favorites[id]; else favorites[id] = true;
      writeStorage(storageKeys.favorites, favorites);
      renderBooks(); showToast(text(wasFavorite ? "removedFavorite" : "savedFavorite"));
    } else if (openButton) {
      const id = openButton.dataset.openBook;
      const progress = getProgress()[id];
      openBook(id, progress && !progress.completed ? progress.page || 0 : 0);
    }
  });

  window.addEventListener("hashchange", handleHashChange);
  window.addEventListener("beforeunload", stopSpeech);

  translateStaticUI();
  renderBooks();
  const initialMatch = window.location.hash.match(/^#book\/(.+)$/);
  if (initialMatch) {
    const id = decodeURIComponent(initialMatch[1]);
    const progress = getProgress()[id];
    state.page = progress && !progress.completed ? progress.page || 0 : 0;
    openBook(id, state.page);
  }
})();
