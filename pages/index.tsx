import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import { configuredSanityClient } from '../sanityApi'
import imageUrlBuilder from '@sanity/image-url'

import Menu from '../components/Menu'
import HMenu from '../components/HMenu'

import { PostInterface } from '../typings'
import NewStory from './new-story'

interface Props {
  posts: PostInterface[]
}

const builder = imageUrlBuilder(configuredSanityClient)
function urlFor(source: string) {
  return builder.image(source)
}

const Home: NextPage<Props> = ({ posts }) => {
  // const router = useRouter()
  // const [isMobile, setIsMobile] = useState(false)
  // const handleScreenSize = () => {
  //   if (window.innerWidth < 768) {
  //     setIsMobile(true)
  //   } else {
  //     setIsMobile(false)
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener('resize', handleScreenSize)
  // })

  return (
    <div className="m-0 box-border text-mainText">
      <Head>
        <title>Medium Blog</title>
      </Head>

      <div className="flex flex-col md:flex-row md:justify-between m-auto md:max-w-3xl lg:max-w-[1504px]">
        {/* {isMobile && <HMenu />} */}
        <Menu />
        <div className="block divide-y-[1px] divide-[#E0E0E0] m-auto px-7 md:max-w-[692px] mb-[80px] md:m-0">
          {posts.map((element) => (
            <Link key={element._id} href={`/post/${element._id}`}>
              <div className="flex gap-6 flex-col md:flex-row justify-between items-start md:items-center w-full min-h-[230px] py-5 cursor-pointer">
                <div className="flex flex-col justify-center items-start h-auto mt-10 mb-4 md:m-0">
                  {/* author */}
                  <div className="flex flex-row items-center pb-3">
                    <img
                      className="w-[22px] h-auto rounded-full object-cover"
                      src={urlFor(element.author.image).width(200).url()!}
                      alt=""
                    />
                    <span className="pl-3 text-sm font-medium">
                      {element.author.name}
                    </span>
                  </div>
                  {/* title */}
                  <div className="max-w-md pb-3">
                    <p className="text-2xl font-extrabold pb-1">
                      {element.title}
                    </p>
                    <p className="text-base font-normal text-gray overflow-ellipsis">
                      {element.description}
                    </p>
                  </div>
                  {/* data */}
                  <div className="text-sm text-gray font-normal">
                    {element.publishedAt
                      .slice(0, 10)
                      .split('-')
                      .reverse()
                      .join('-')}
                  </div>
                </div>
                {/* image */}
                <div className="flex flex-col justify-center items-center w-full h-[230px] md:w-[150px] md:h-[150px] m-0 object-cover">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={urlFor(element.mainImage.asset).url()!}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex border-l-[1px] border-[#E0E0E0] w-[340px] z-10">
          <div className=""></div>
        </div>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title, 
    description,
    mainImage, 
    author -> {name, image},
    slug,
    publishedAt
   }`

  const posts = await configuredSanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}
