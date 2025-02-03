import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth(); // Await auth() to get authentication details

  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn(); // Redirect user to sign-in page if not authenticated
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher([
//   '/api/webhooks(.*)'
// ])

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect()
// })

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// }
