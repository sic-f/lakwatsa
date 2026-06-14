import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isEmpty } from 'lodash';
 
const protectedRoutes = ['/account']
const publicRoutes = ['/login', '/register']
 
export const proxy = async (req: NextRequest) => {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  const session = (await cookies()).get('session')?.value;
 
  if (isProtectedRoute && isEmpty(session)) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    !isEmpty(session) &&
    !req.nextUrl.pathname.startsWith('/profile')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}