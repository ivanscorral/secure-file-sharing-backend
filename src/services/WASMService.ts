/* eslint-disable @typescript-eslint/no-unused-vars */
interface WASMModule {
    name: string
    instance: WebAssembly.Instance
    exports: any
}

class WASMService {
  // modules: key: name, value: WASMModule
  private modules: Map<string, WASMModule> = new Map()

  async load (name: string, path: string): Promise<void> {
    const wasmBuffer = await this.fetchWASM(path)
    const module = await WebAssembly.instantiate(wasmBuffer)
    this.modules.set(name, {
      name,
      instance: module.instance,
      exports: module.instance.exports
    })
  }

  private async fetchWASM (path: string): Promise<ArrayBuffer> {
    const response = await fetch(path)
    return await response.arrayBuffer()
  }

  getModule (name: string): WASMModule | undefined {
    return this.modules.get(name)
  }

  callFunction (name: string, functionName: string, ...args: any[]): any {
    const module = this.getModule(name)
    if (!module || !module.exports[functionName]) {
      throw new Error(`Function ${functionName} not found in module ${name}`)
      return
    }
    return module.exports[functionName](...args)
  }
}
