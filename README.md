# Roamly

Стартовый проект на Vue 3, TypeScript и Vite 6. Компоненты используют Composition API и `<script setup lang="ts">`.

Алиас `@` указывает на `src/` и настроен в Vite и TypeScript. Например:

```ts
import HelloWorld from '@/components/HelloWorld.vue'
import '@/style.css'
```

Установка зависимостей и запуск:

```sh
npm install
npm run dev
```

Проверка TypeScript и production-сборка:

```sh
npm run build
```

Результат сборки находится в `dist/`. Локальный просмотр сборки: `npm run preview`.

Проверки качества кода:

| Команда                | Назначение                                                                               |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `npm run lint`         | Проверка JavaScript, TypeScript и Vue; предупреждения также завершают проверку с ошибкой |
| `npm run lint:fix`     | Автоматическое исправление поддерживаемых ESLint проблем                                 |
| `npm run format`       | Форматирование файлов с помощью Prettier                                                 |
| `npm run format:check` | Проверка форматирования без изменения файлов                                             |
| `npm run typecheck`    | Проверка типов TypeScript и Vue                                                          |
| `npm run check`        | Последовательный запуск lint, проверки форматирования и типов                            |

ESLint использует flat config (`eslint.config.js`) и рекомендуемые правила JavaScript,
TypeScript и Vue. Prettier отвечает за оформление: отступы в два пробела, одинарные
кавычки в JavaScript/TypeScript, без точек с запятой, ширина строки 100 символов.
`eslint-config-prettier` отключает конфликтующие правила ESLint.
Проверка типов выполняется отдельно через `vue-tsc`.
Версии `typescript-eslint` и `@typescript-eslint/parser` закреплены для совместимости
с Node.js 20.16; обновляйте их вместе с учётом требований к Node.js.

Перед коммитом или в CI запустите `npm run check` и `npm run build`.

В VS Code/Cursor установите рекомендованные расширения из `.vscode/extensions.json`:
ESLint, Prettier и Vue - Official. Настройки `.vscode/settings.json` включают
исправления ESLint при явном сохранении (Cmd+S / Ctrl+S) и форматирование Prettier.
Правило `@typescript-eslint/consistent-type-imports` автоматически преобразует
импорты, используемые только как типы, в `import type`. Ошибки без автоматического
исправления нужно исправлять вручную. Проверка типов остаётся отдельной командой
`npm run type:check`.
