import React from 'react'
import type { ITimelineItem } from '../pages/TimelineItemsPage';
import TimelineItemCard from './TimelineItemCard';
import formatDate from '../utils/formatDate';

type CombinedLinearTimelineProps = {
  items: ITimelineItem[];
};

function CombinedLinearTimeline({ items }: CombinedLinearTimelineProps) {

  return (
    <div className=" max-w-full flex overflow-x-scroll justify-evenly mt-5 lg:flex-row sm:flex-col max-h-[600px] rounded-md border-1 border-slate-200 p-2 ">
        {[...items].reverse().map((timelineItem) => {
            const hasDateRange = timelineItem.endDate && timelineItem.endDate !== timelineItem.startDate;
            return (
            <div key={timelineItem._id}>
                <p className='text-[10px] max-w-[100px] font-bold text-blue-800 '>{formatDate(timelineItem.startDate)}
                  {hasDateRange && ' -'}
                </p>
                {hasDateRange && (
                    <p className='text-[10px] max-w-[100px] font-bold text-blue-800 '>{formatDate(timelineItem.endDate)}</p>
                )}                
                
                <p className='text-[12px] max-w-[100px] my-1'>{timelineItem.title}</p> 

                {typeof timelineItem.timeline !== "string" && (
                    <span className='inline-block bg-blue-100 text-blue-800 text-[10px] px-2 py-1 rounded-full max-w-[100px] truncate'>{timelineItem.timeline.title}</span>
                )}
            </div>
            );
        })}
    </div>


  )
}

export default CombinedLinearTimeline