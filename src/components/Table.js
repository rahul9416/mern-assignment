import React from "react";

export default function Table({ data, selectedUser }) {
    const headers = ['First Name', 'Last Name', 'Email', 'Project Detail']
    return (
        <table className="w-auto divide-y divide-gray-300">
            <thead className="bg-gray-50">
                <tr>
                    {data && headers.map((key, idx) => (
                            <th key={idx} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item, index) => (
                    <tr key={index}>
                        {data && Object.values(item).map((value, i) => (
                            i !== 0 ? (
                                <th key={i} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">{value}</th>
                            ) : null
                        ))}
                        <th className="space-x-2 text-md font-normal">
                            <button onClick={() => selectedUser(item)}>Edit</button>
                            <span>|</span>
                            <button>Delete</button>
                        </th>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}