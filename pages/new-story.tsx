import React from 'react'
import Link from 'next/link'

function NewStory() {
  return (
    <div className="max-w-[1032px] m-auto">
      <header className="flex flex-row justify-between items-center h-16">
        <div className="flex flex-row items-center space-x-4">
          <Link href={'/'} className="cursor-pointer">
            <svg
              viewBox="0 0 1070 610"
              width={'45px'}
              className="cursor-pointer"
            >
              <path d="M594.79 308.2c0 163.76-131.85 296.52-294.5 296.52S5.8 472 5.8 308.2 137.65 11.69 300.29 11.69s294.5 132.75 294.5 296.51M917.86 308.2c0 154.16-65.93 279.12-147.25 279.12s-147.25-125-147.25-279.12S689.29 29.08 770.61 29.08s147.25 125 147.25 279.12M1050 308.2c0 138.12-23.19 250.08-51.79 250.08s-51.79-112-51.79-250.08 23.19-250.08 51.8-250.08S1050 170.09 1050 308.2M1862.77"></path>
            </svg>
          </Link>
          <span className="text-sm text-mainText">Draft</span>
        </div>
        <div className="flex flex-row items-stretch space-x-4">
          <button
            className="bg-green hover:bg-greenHover px-4 rounded-full font-medium text-sm text-white"
            type="submit"
          >
            Publish
          </button>
          <figure className="bg-[#E0E0E0] rounded-full w-8 h-8"></figure>
        </div>
      </header>
      <div>
        <form className="flex flex-col">
          <label>
            <span>Title</span>
            <input placeholder="Title" type="text" />
          </label>
          <label>
            <span>Description</span>
            <input placeholder="Description" type="text" />
          </label>
          <label>
            <span>Author</span>
          </label>
          <label>
            <span>Image</span>
            <input type="file" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default NewStory
