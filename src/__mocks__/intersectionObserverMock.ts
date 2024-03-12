class IntersectionObserverMock {
    constructor() {}
  
    observe() {
      return null;
    }
  
    disconnect() {
      return null;
    }
  }
  
  global.IntersectionObserver = IntersectionObserverMock;