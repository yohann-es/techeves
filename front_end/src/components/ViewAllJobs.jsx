const ViewAllJobs = ({ onFilter }) => {
    return (
        <section className="container mx-auto max-w-4xl my-16 px-4">

            {/* Big CTA stays same */}
            ...

            {/* Channel Filters */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                    onClick={() => onFilter("TechsAfrica")}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                    Techs Africa
                </button>

                <button
                    onClick={() => onFilter("AlxEthiopiaOfficial")}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                    ALX Ethiopia
                </button>

                <button
                    onClick={() => onFilter("EthioTechnollogy")}
                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                >
                    Ethio Technology
                </button>

                <button
                    onClick={() => onFilter(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                    All Events
                </button>
            </div>
        </section>
    );
};

export default ViewAllJobs;
