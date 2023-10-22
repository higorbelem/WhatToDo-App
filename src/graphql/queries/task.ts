import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
    mutation CREATE_TASK ($name: String!, $date: String!, $time: String, $priority: String, $reminders: [String!], $deviceId: String!) {
        createTask (data: {name: $name, date: $date, time: $time, priority: $priority, reminders: $reminders, deviceId: $deviceId}) {
            id,
            name,
            date,
            time,
            priority,
            reminders,
            deviceId,
            done
        }
    }
`;

export const GET_TASKS = gql`
    query GET_TASKS ($deviceId: String!, $startDate: String!, $endDate: String!) {
        tasks (deviceId: $deviceId, startDate: $startDate, endDate: $endDate) {
            id,
            name,
            date,
            time,
            priority,
            reminders,
            deviceId,
            done
        }
    }
`;

export const FINISH_TASK = gql`
    mutation FINISH_TASK ($deviceId: String!, $taskId: String!) {
        finishTask (deviceId: $deviceId, taskId: $taskId)
    }
`;

export const DELETE_TASK = gql`
    mutation DELETE_TASK ($deviceId: String!, $taskId: String!) {
        deleteTask (deviceId: $deviceId, taskId: $taskId)
    }
`;