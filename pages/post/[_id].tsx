import React from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { useState } from 'react'

import { configuredSanityClient } from '../../sanityApi'
import imageUrlBuilder from '@sanity/image-url'
import Menu from '../../components/Menu'
import { PostInterface } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'

const builder = imageUrlBuilder(configuredSanityClient)
function urlFor(source: string) {
  return builder.image(source)
}

interface Props {
  post: PostInterface[]
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

function dataBuilder(data: string) {
  return data.slice(0, 10).split('-').reverse().join('-')
}

//static path
export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
        _id
       }`

  const posts = await configuredSanityClient.fetch(query)

  const paths = posts.map((post: PostInterface) => ({
    params: {
      _id: post._id
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

//static props
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && _id == $_id]{
    _id,
    _createdAt,
    title,
    description,
    mainImage, 
    author -> {name, image, bio},
    slug,
    publishedAt,
    body,
    'comments': *[
      _type == 'comment' &&
      post._ref == ^._id 
    ]
   }`

  //&& approved == true

  const post = await configuredSanityClient.fetch(query, {
    _id: params?._id
  })

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: { post },
    revalidate: 60
  }
}

//component
function Post({ post }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post[0]._id) {
    return <ErrorPage statusCode={404} />
  }

  const [submitedComm, setSubmitedComm] = useState(false)

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    comment: ''
  })

  // useForm Hook
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>()

  // fetching comments
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    post[0].comments.push(data)

    fetch('/api/createComment', {
      method: 'Post',
      body: JSON.stringify(data)
    })
      .then(() => {
        setSubmitedComm(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitedComm(false)
      })

    //reset inputs
    setInputValue({
      name: '',
      email: '',
      comment: ''
    })
  }

  return (
    <div className="block md:flex md:flex-row md:justify-evenly lg:justify-between max-w-[1504px] m-auto">
      <Menu />

      <main className="flex-auto flex-col md:max-w-[692px] w-full mt-14 px-7">
        {/* author */}
        <div className="flex flex-row items-center md:w-full mb-8">
          <img
            className="rounded-full w-auto mr-4"
            src={urlFor(post[0].author.image).width(48).url()!}
            alt=""
          />
          <div className="flex flex-col justify-between h-12">
            <span className="text-base">{post[0].author.name}</span>
            <span className="text-sm text-secondaryText">
              {dataBuilder(post[0].publishedAt)}
            </span>
          </div>
        </div>
        {/* title */}
        <div className="flex flex-col mb-8 w-full">
          <span className="text-3xl font-extrabold mb-2">{post[0].title}</span>
          <span className="text-xl text-secondaryText">
            {post[0].description}
          </span>
        </div>
        {/* image */}
        <div className="items-center mb-8 w-full">
          <img
            className="w-full max-h-[640px] object-cover"
            src={urlFor(post[0].mainImage.asset).url()!}
            alt=""
          />
        </div>

        {/* content */}
        <article className="font-Charter text-xl">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post[0].body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-4xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold" {...props} />
              ),
              p: (props: any) => <p className="mb-10" {...props} />,
              li: ({ children }: any) => <li className="">{children}</li>,
              link: ({ href, children }: any) => (
                <a href={href} className="underline">
                  {children}
                </a>
              ),
              blockquote: (props: any) => (
                <blockquote
                  className="border-l-4 border-[#E0E0E0] px-3 my-8 text-secondaryText"
                  {...props}
                />
              )
            }}
          />
        </article>

        <hr className="max-w-full text-[#9E9E9E] my-10"></hr>
      </main>

      <div className="mb-[80px] md:mb-0 block md:hidden lg:flex flex-col border-l-[1px] border-[#E0E0E0] w-full md:w-[340px] z-10">
        <div className="flex flex-col p-6 space-y-2">
          <img
            className="rounded-full w-[88px] mr-4"
            src={urlFor(post[0].author.image).width(88).url()!}
            alt=""
          />
          <span className="font-medium text-lg">{post[0].author.name}</span>
          {post[0].author.bio && (
            <p className="text-sm text-secondaryText">
              <PortableText
                dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                content={post[0].author.bio}
                serializers={{
                  p: ({ children }: any) => <p>{children}</p>
                }}
              />
            </p>
          )}
        </div>
        <div className="flex flex-col w-full md:sticky md:top-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-5 px-6"
            name="commentForm"
          >
            <h2 className="text-xl font-bold">
              Responses ({post[0].comments.length})
            </h2>
            <div className="p-4 w-full bg-white rounded-md drop-shadow-lg">
              <input
                {...register('_id')}
                type="hidden"
                name="_id"
                value={post[0]._id}
              />

              <label>
                <span className="text-xs">Name</span>
                <input
                  {...register('name', { required: true })}
                  // defaultValue="test"
                  placeholder="Name"
                  type="text"
                  name="name"
                  className="w-full text-base py-2 outline-none"
                  value={inputValue.name}
                  onChange={(event) =>
                    setInputValue((prevState) => ({
                      ...prevState,
                      name: event.target.value
                    }))
                  }
                />
              </label>
              {/* {errors.name && (
                <span className="text-[#EC407A]">
                  The name field is required
                </span>
              )} */}

              <label>
                <span className="text-xs">Email</span>
                <input
                  {...register('email', { required: true })}
                  placeholder="Email"
                  type="email"
                  name="email"
                  className="w-full text-base py-2 outline-none"
                  value={inputValue.email}
                  onChange={(event) =>
                    setInputValue((prevState) => ({
                      ...prevState,
                      email: event.target.value
                    }))
                  }
                />
              </label>

              <hr className="w-full text-[#E0E0E0]"></hr>

              <label className="flex flex-row">
                <textarea
                  {...register('comment', { required: true })}
                  className="cursor-text outline-none resize-none w-full py-2"
                  placeholder="What are your thoughts?"
                  name="comment"
                  rows={3}
                  value={inputValue.comment}
                  onChange={(event) =>
                    setInputValue((prevState) => ({
                      ...prevState,
                      comment: event.target.value
                    }))
                  }
                />
              </label>

              <div className="flex flex-row space-x-4 w-full justify-end text-sm">
                <button className="text-gray hover:text-black" type="reset">
                  Cancel
                </button>
                <button
                  className="bg-green hover:bg-greenHover py-1.5 px-4 rounded-full font-normal text-white"
                  type="submit"
                >
                  Respond
                </button>
              </div>
            </div>
          </form>
          <hr className="w-full text-[#E0E0E0] mt-10" />
          <div className="divide-y-[1px] px-6 divide-[#E0E0E0]">
            {post[0].comments.map((comment) => (
              <div className="flex flex-col py-5 space-y-3" key={comment._id}>
                <div className="flex flex-row items-center">
                  <img
                    className="rounded-full h-8 w-auto mr-3"
                    src={
                      'https://miro.medium.com/fit/c/176/176/1*dmbNkD5D-u45r44go_cf0g.png'
                    }
                    alt=""
                  />
                  <div className="flex flex-col justify-between h-9">
                    <span className="text-sm">{comment.name}</span>
                    <span className="text-sm text-secondaryText">
                      {dataBuilder(post[0]._createdAt)}
                    </span>
                  </div>
                </div>
                <div className="text-sm">
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
