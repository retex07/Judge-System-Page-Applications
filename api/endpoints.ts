const ENDPOINTS_CONFIG = {
  user: {
    postLogin: 'users/login',
    getAdmins: 'users/admins',

    postAdmin: `users/admins`,
    putAdmin: (id: string) => `users/admins/${id}`,

    getJudges: 'users/judges',
    getAthletes: 'users/athletes',
    getJudge: (id: string) => `users/judges/${id}`,
    getAthlete: (id: string) => `users/athletes/${id}`,

    postJudge: 'users/judges',
    putJudge: (id: string) => `users/judges/${id}`,
    deleteJudge: (id: string) => `users/judges/${id}`,

    postAthlete: 'users/athletes',
    findAthletes: 'users/athletes/find',
    putAthlete: (id: string) => `users/athletes/${id}`,
    deleteAthlete: (id: string) => `users/athletes/${id}`,

    getCoaches: 'users/coaches',
    getCoach: (id: string) => `users/coaches/${id}`,

    deleteUserRole: (id: string) => `users/role/${id}`,
  },
  application: {
    getApplications: 'applications/applications',
    postApplication: 'applications/applications',
    deleteApplication: (id: string) => `applications/applications/${id}`,
    putApplication: (id: string) => `applications/applications/${id}`,
    patchReviewApplication: (id: string) => `applications/applications/${id}/on_review`,
    patchApproveApplication: (id: string) => `applications/applications/${id}/approve`,
    patchRejectApplication: (id: string) => `applications/applications/${id}/reject`,

    getAttachment: (id: string) => `dictionaries/attachments/${id}`,

    getParticipant: 'applications/participants',
    postParticipant: 'applications/participants',
    putParticipant: (id: string) => `applications/participants/${id}`,
    deleteParticipant: (id: string) => `applications/participants/${id}`,

    getPerformances: `applications/performances`,
    postPerformances: `applications/performances`,
    putPerformance: (id: string) => `applications/performances/${id}`,
    deletePerformance: (id: string) => `applications/performances/${id}`,

    getEvents: 'applications/events',
    getEvent: (id: string) => `applications/events/${id}`,

    postEvent: 'applications/events',
    putEvent: (id: string) => `applications/events/${id}`,
  },

  dictionaries: {
    getRegions: 'dictionaries/regions',
    getRegion: (id: string) => `dictionaries/regions/${id}`,

    getSettlements: 'dictionaries/settlements',
    getSettlement: (id: string) => `dictionaries/settlements/${id}`,

    getOrganizations: 'dictionaries/organizations',
    getOrganization: (id: string) => `dictionaries/organizations/${id}`,

    getAttachment: (id: string) => `dictionaries/attachments/${id}`,

    postRegion: 'dictionaries/regions',
    putRegion: (id: string) => `dictionaries/regions/${id}`,
    deleteRegion: (id: string) => `dictionaries/regions/${id}`,

    postSettlements: 'dictionaries/settlements',
    putSettlements: (id: string) => `dictionaries/settlements/${id}`,
    deleteSettlement: (id: string) => `dictionaries/settlements/${id}`,

    postOrganization: 'dictionaries/organizations',
    putOrganization: (id: string) => `dictionaries/organizations/${id}`,
    deleteOrganization: (id: string) => `dictionaries/organizations/${id}`,

    postAttachments: `dictionaries/attachments`,
  },
  protocol: {
    getProgram: (id: string) => `protocol/events/${id}/programs`,
    getBlocks: (id: string) => `protocol/events/${id}/blocks`,

    getProgramXls: (id: string) => `protocol/programs/${id}/exports`,
    getCheckViolation: (id: string) => `protocol/programs/${id}/violations`,

    getSection: (id: string) => `protocol/protocols/programs/sections/${id}`,

    patchBlock: (id: string) => `protocol/programs/blocks/${id}`,
    putBlock: (id: string) => `protocol/programs/blocks/${id}`,
    postAwardBreak: (programId: string) => `protocol/programs/${programId}/sections`,

    deleteAwardBreakSection: (sectionId: string) => `protocol/programs/sections/${sectionId}`,

    postQualsBlock: (id: string) => `protocol/programs/blocks/${id}/quals`,
    deleteQualsBLock: (id: string) => `protocol/programs/blocks/${id}/quals`,

    patchSectionTime: (programId: string, sectionId: string) => `protocol/programs/${programId}/sections/${sectionId}`,
    postNumeratePerformances: (programId: string) => `protocol/protocols/${programId}/performances/serial-number`,

    patchMovePerformance: (id: string) => `protocol/protocols/performances/${id}`,
  },
};

type EndpointsConfig = typeof ENDPOINTS_CONFIG;

type EnhancedEndpoints = {
  [SK in keyof EndpointsConfig]: {
    // @ts-expect-error only string
    [Key in keyof EndpointsConfig[SK]]: { queryKey: [`${SK}|${Key}`]; api: EndpointsConfig[SK][Key] };
  };
};

export const ENDPOINTS = Object.fromEntries(
  Object.entries(ENDPOINTS_CONFIG).map(([key, config]) => [
    key,
    Object.entries(config).reduce(
      (acc, [apiKey, api]) => ({
        ...acc,
        [apiKey]: { queryKey: [`${key}|${apiKey}`], api },
      }),
      {} as EnhancedEndpoints[keyof EnhancedEndpoints],
    ),
  ]),
) as EnhancedEndpoints;
