import React from 'react'

function SkillCard({ skills,section }) {

    // Group skills by skillSection
    
    return (

        <div data-aos="zoom-in" className={`border p-3 border-gray-500 rounded-md  `}>
            <h2 className='text-2xl text-blue-500 mb-3 font-bold capitalize'>{section}</h2>

            <div className='flex flex-wrap gap-2 justify-center items-center'>
                {
                    skills.filter(skill => skill.skillSection === section).map((item, index) => {
                        return (
                            <div key={index} className=' border border-gray-500 rounded-md  px-2 py-1 flex items-center justify-center'>
                                <img
                                    src={item?.skillImage?.secure_url}
                                    className='h-8'
                                />
                                <span className='ml-2'>{item?.skillName}</span>
                            </div>
                        )
                    })
                    // If no skills found for a section, display a message
                    || <div className='text-gray-400'>No skills found for this section.</div>
                }
            </div>
        </div>


    )
}

export default SkillCard



