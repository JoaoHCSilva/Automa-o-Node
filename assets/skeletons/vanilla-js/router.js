// router.js — Router SPA hash-based para navegação sem reload
// Usa hash (#/rota) para evitar dependência de configuração no servidor

export class Router {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    this.routes = new Map()
    this.currentRoute = null

    // Escuta mudanças de hash para trocar de página
    window.addEventListener('hashchange', () => this.resolve())

    // Intercepta cliques em links com [data-link] para navegação SPA
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]')
      if (link) {
        e.preventDefault()
        this.navigate(link.getAttribute('href'))
      }
    })
  }

  addRoute(path, handler) {
    this.routes.set(path, handler)
  }

  navigate(path) {
    window.location.hash = path
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/'
    const handler = this.routes.get(hash)

    if (!this.container) return

    if (handler) {
      this.currentRoute = hash
      this.container.innerHTML = handler()
      this.bindEvents()
    } else {
      this.container.innerHTML = this.notFound()
    }
  }

  // Reaplica event listeners após trocar conteúdo da página
  bindEvents() {
    this.container.querySelectorAll('[data-link]').forEach((link) => {
      const href = link.getAttribute('href')
      if (href === this.currentRoute) {
        link.classList.add('active')
      }
    })
  }

  notFound() {
    return `
      <div class="page-404">
        <h1>404</h1>
        <p>Página não encontrada</p>
        <a href="#/" data-link>Voltar para Home</a>
      </div>
    `
  }

  start() {
    this.resolve()
  }
}
