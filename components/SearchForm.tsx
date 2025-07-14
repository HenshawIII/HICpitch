import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import {Search} from 'lucide-react'

const SearchForm = ({query}:{query?:"string"}) => {
    // const query = "test"
    
  return (
    <>
    <Form action={'/'} className={'search-form'} scroll={false}>
    <input name={"query"} type="text" defaultValue={""} placeholder='Search Startups by name,category or title' className='search-input' />

    <div className='flex gap-2'>
        {
            query && (<SearchFormReset/>)
        }

        <button type='submit' className='search-btn text-white'>
            <Search className='size-5'/>
        </button>
    </div>

    </Form>
    </>
  )
}

export default SearchForm