/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { setConfigurableRepositoryPath, setLocalFolderPath, setRepositoryLocations } from '../../../api/services/modelRepositoryService';
import { RepositoryLocationSettings } from '../state';
import { getConfigurableRepositoryPath, getLocalFolderPath, getRepositoryLocationTypes } from '../reducer';
import { NotificationType } from '../../../api/models/notification';
import { ResourceKeys } from '../../../../localization/resourceKeys';
import { raiseNotificationToast } from '../../../notifications/components/notificationToast';

export function* setRepositoryLocationsSaga(action: Action<RepositoryLocationSettings[]>): SagaIterator {
    const localFolderPath = yield call(getLocalFolderPath, action.payload);
    yield call(setLocalFolderPath, localFolderPath);

    const configurableRepositoryPath = yield call(getConfigurableRepositoryPath, action.payload);
    yield call(setConfigurableRepositoryPath, configurableRepositoryPath);

    const locations = yield call(getRepositoryLocationTypes, action.payload);
    yield call(setRepositoryLocations, locations);

    yield call(raiseNotificationToast, {
        text: {
            translationKey: ResourceKeys.notifications.modelRepoistorySettingsUpdated
        },
        type: NotificationType.success
    });
}
