export function parsePathForNavigation(pathname: string) {
    const parts = pathname.split('/')
    let category: string | undefined
    let subcategory: string | undefined
  
    if (pathname.startsWith('/categories/')) {
      // Format: /categories/[category]/[subcategory]
      category = parts[2]
      subcategory = parts[3]
    } else {
      // Format: /[location]/[category]/[subcategory]
      category = parts[2]
      subcategory = parts[3]
    }
  
    return {
      category,
      subcategory
    }
  }