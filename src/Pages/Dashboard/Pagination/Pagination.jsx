import ReactPaginate from 'react-paginate';

import './Pagination.css'




export default function PaginatedItems({ itemsPerPage ,setPage,total}) {

//   const [itemOffset, setItemOffset] = useState(0);
      // const pageCount=data.length/(itemsPerPage);
      // const pageCount=total/(itemsPerPage);
      const pageCount=Math.ceil(total/(itemsPerPage))
      
    //  console.log(total) 
    //  console.log(itemsPerPage) 
 


  return (
    <>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e)=>setPage(e.selected+1)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end"
        pageLinkClassName="pagination-tag-anchor mx-2 text-secondary rounded-circle"
        activeLinkClassName="text-white bg-primary"
      />
    </>
  );
}