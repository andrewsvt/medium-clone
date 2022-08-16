import Link from 'next/link'
import { useRouter } from 'next/router'

function Menu() {
  const router = useRouter()

  return (
    <div className="border-t-[1px] md:border-r-[1px] border-[#E0E0E0] w-screen md:w-20 h-[80px] md:h-screen z-10 fixed md:sticky md:top-0 bottom-0 ">
      <div className="flex flex-row md:flex-col justify-center md:justify-between m-auto items-center w-full h-full bg-white">
        {/* Logo */}
        <div className="hidden md:flex">
          <Link href={'/'} className="cursor-pointer">
            <svg
              viewBox="0 0 1070 610"
              className="w-10 object-contain cursor-pointer py-10"
            >
              <path d="M594.79 308.2c0 163.76-131.85 296.52-294.5 296.52S5.8 472 5.8 308.2 137.65 11.69 300.29 11.69s294.5 132.75 294.5 296.51M917.86 308.2c0 154.16-65.93 279.12-147.25 279.12s-147.25-125-147.25-279.12S689.29 29.08 770.61 29.08s147.25 125 147.25 279.12M1050 308.2c0 138.12-23.19 250.08-51.79 250.08s-51.79-112-51.79-250.08 23.19-250.08 51.8-250.08S1050 170.09 1050 308.2M1862.77"></path>
            </svg>
          </Link>
        </div>
        {/* Nav */}
        <nav className="flex flex-row md:flex-col space-x-12 md:space-y-9 md:space-x-0 text-gray transition-all">
          <div className="cursor-pointer">
            <Link href={'/'}>
              {router.pathname == '/' ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-label="Home"
                  className="text-black"
                >
                  <path
                    d="M4.5 21.25V10.87c0-.07.04-.15.1-.2l7.25-5.43a.25.25 0 0 1 .3 0l7.25 5.44c.06.04.1.12.1.2v10.37c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v5.5c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-label="Home"
                  className="hover:text-black"
                >
                  <path
                    d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              )}
            </Link>
          </div>
          <div className="cursor-pointer hidden md:block">
            <Link href={'/notifications'}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Notifications"
                className="hover:text-black"
              >
                <path
                  d="M15 18.5a3 3 0 1 1-6 0"
                  stroke="currentColor"
                  strokeLinecap="round"
                  fill="none"
                ></path>
                <path
                  d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link href={'/seved'}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Lists"
                className="hover:text-black"
              >
                <path
                  d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  fill="none"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="cursor-pointer hidden md:block">
            <Link href={'/notes'}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Stories"
                className="hover:text-black"
              >
                <path
                  d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z"
                  stroke="currentColor"
                ></path>
                <path
                  d="M8 8.5h8M8 15.5h5M8 12h8"
                  stroke="currentColor"
                  strokeLinecap="round"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="hidden md:block">
            <hr className="text-[#E0E0E0]" />
          </div>
          <div className="cursor-pointer">
            <Link href={'/new-story'}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Write"
                className="hover:text-black"
              >
                <path
                  d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                  stroke="currentColor"
                ></path>
              </svg>
            </Link>
          </div>
        </nav>
        {/* User */}
        <div className="flex ml-12 md:m-0">
          <figure className="bg-[#E0E0E0] rounded-full w-8 h-8 mb-0 md:mb-10"></figure>
        </div>
      </div>
    </div>
  )
}

export default Menu
