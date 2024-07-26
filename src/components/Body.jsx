/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import useSelectHook from "../hooks/useSelect";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useMediaQuery } from "@mui/material";

const Body = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [type, setType] = useSelectHook("all");
    const [dateRange, setDateRange] = useSelectHook("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const scrollContainerRef = useRef(null);
    const is640px = useMediaQuery('(max-width:640px)');
    console.log(is640px);

    const fetchRetreats = async () => {
        try {
            const response = await axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats`);
            const data = response.data;

            const filteredData = data.filter(retreat => {
                const date = new Date(retreat.date);
                //getting year
                const year = date.getFullYear();

                let dateMatch = false;
                if (dateRange === "all") {
                    dateMatch = true;
                } else if (dateRange === "1800-1900" && year >= 1800 && year < 1900) {
                    dateMatch = true;
                } else if (dateRange === "1900-2000" && year >= 1900 && year < 2000) {
                    dateMatch = true;
                } else if (dateRange === "2000-2020" && year >= 2000 && year < 2020) {
                    dateMatch = true;
                } else if (dateRange === "2020-2030" && year >= 2020 && year < 2030) {
                    dateMatch = true;
                }

                const typeMatch = type === "all" || retreat.tag.includes(type.toLowerCase());

                const searchMatch = searchQuery === "" ||
                    retreat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    retreat.date.toString().includes(searchQuery.toLowerCase()) ||
                    retreat.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    retreat.price.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                    retreat.location.toLowerCase().includes(searchQuery.toLowerCase());

                // console.log(searchMatch);

                return dateMatch && typeMatch && searchMatch;
            });

            setFetchedData(filteredData);
        } catch (error) {
            console.error('Error fetching retreats:', error);
        }
    };

    const itemsPerPage = is640px ? 3 : fetchedData.length; // Number of items per page for 640px screens, otherwise show all
    const totalPages = Math.ceil(fetchedData.length / itemsPerPage);

    const scrollLeft = () => {
        if (is640px) {
            setCurrentPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0));
        } else if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -335, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (is640px) {
            setCurrentPage(prevPage => (prevPage < totalPages - 1 ? prevPage + 1 : totalPages - 1));
        } else if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 335, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        fetchRetreats();
    }, [type, dateRange, searchQuery]);

    const paginatedData = is640px
        ? fetchedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        : fetchedData;

    return (
        <div className="w-full sm:px-6 p-6 flex flex-col gap-6">
            <FilterOptions setType={setType} setDateRange={setDateRange} setSearchQuery={setSearchQuery} />

            {
                is640px ?
                    <div className="flex flex-col gap-4">
                        {
                            paginatedData.map((data, index) => (
                                <Card data={data} key={index} />
                            ))
                        }
                    </div>
                    :
                    <div ref={scrollContainerRef} className="flex flex-row-reverse items-stretch gap-4 w-full overflow-hidden min-h-[485px] scrollbar-hide relative">
                        {
                            paginatedData.map((data, index) => (
                                <Card data={data} key={index} />
                            ))
                        }
                    </div>
            }

            <div className="flex flex-row justify-center w-full gap-x-4">
                <button onClick={scrollLeft} className="text-4xl text-blue-700 bg-white rounded-full left-0">
                    <FaChevronCircleLeft />
                </button>

                <button onClick={scrollRight} className="text-4xl text-blue-700 bg-white rounded-full right-0" >
                    <FaChevronCircleRight />
                </button>
            </div>
        </div>
    );
};

export default Body;

// eslint-disable-next-line react/prop-types
function Card({ data }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="bg-blue-300 p-4 rounded-xl flex-col flex gap-y-3 sm:min-w-80 sm:max-w-80 w-full">
            <img src={data.image} alt="image" className="h-52 object-cover rounded-lg" />

            <div className="flex flex-row items-center justify-between font-bold text-xl">
                <h3>{data.condition}</h3>
                <span>${data.price}</span>
            </div>

            <div className="font-medium">
                <p>At: {data.location}</p>
                <p>On: {formatDate(data.date)}</p>
                <p>{data.description}</p>
            </div>
        </div>
    );
}

function FilterOptions({ setType, setDateRange, setSearchQuery }) {
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="w-full flex md:flex-row flex-col items-center justify-between gap-y-3">
            <section className="flex md:flex-row flex-col gap-x-5 gap-y-3 md:w-auto w-full">
                <div className="flex flex-row items-center relative md:w-auto w-full">
                    <select {...setDateRange} name="date" id="date" className="px-4 py-2 md:w-auto w-full cursor-pointer pr-10 appearance-none bg-blue-700 text-white rounded-lg">
                        <option className="bg-white text-black" value="all">Filter by date</option>
                        <option className="bg-white text-black" value="1800-1900">1800-1900</option>
                        <option className="bg-white text-black" value="1900-2000">1900-2000</option>
                        <option className="bg-white text-black" value="2000-2020">2000-2020</option>
                        <option className="bg-white text-black" value="2020-2030">2020-2030</option>
                    </select>
                    <IoIosArrowDown className="absolute text-xl right-4 text-white" />
                </div>

                <div className="flex flex-row items-center relative">
                    <select {...setType} name="type" id="type" className="px-4 py-2 md:w-auto w-full cursor-pointer pr-10 appearance-none bg-blue-700 text-white rounded-lg">
                        <option className="bg-white text-black" value="all">Filter by type</option>
                        <option className="bg-white text-black" value="yoga">Yoga</option>
                        <option className="bg-white text-black" value="meditation">Meditation</option>
                        <option className="bg-white text-black" value="detox">Detox</option>
                    </select>
                    <IoIosArrowDown className="absolute text-xl right-4 text-white" />
                </div>
            </section>

            <section className="relative flex flex-row items-center md:w-auto w-full">
                <IoSearch className="absolute left-4 text-gray-600" />
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="p-2 pl-10 border border-gray-400 rounded-lg md:w-80 w-full"
                    placeholder="Search retreats"
                    onKeyDown={handleSearch}
                />
            </section>
        </div>
    );
}
