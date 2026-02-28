// router.ts — Router SPA hash-based para navegação sem reload (TypeScript)

export type PageHandler = () => string

export class Router {
  private container: HTMLElement | null
  private routes: Map<string, PageHandler>
  private currentRoute: string | null

  constructor(containerId: string) {
    this.container = document.getElementById(containerId)
    this.routes = new Map()
    this.currentRoute = null

    window.addEventListener('hashchange', () => this.resolve())

    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest<HTMLAnchorElement>('[data-link]')
      if (link) {
        e.preventDefault()
        const href = link.getAttribute('href')
        if (href) this.navigate(href)
      }
    })
  }

  addRoute(path: string, handler: PageHandler): void {
    this.routes.set(path, handler)
  }

  navigate(path: string): void {
    window.location.hash = path
  }

  resolve(): void {
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

  private bindEvents(): void {
    this.container?.querySelectorAll<HTMLAnchorElement>('[data-link]').forEach((link) => {
      const href = link.getAttribute('href')
      if (href === this.currentRoute) {
        link.classList.add('active')
      }
    })
  }

  private notFound(): string {
    return `
      <div class="page-404">
        <h1>404</h1>
        <p>Página não encontrada</p>
        <a href="#/" data-link>Voltar para Home</a>
      </div>
    `
  }

  start(): void {
    this.resolve()
  }
}
