export interface AdministrationList {
  founderList?: UserIbp[];
  moderatorList?: UserIbp[];
}
export interface AuthenticationDTO {
  credentials?: UserDTO;
  groupId?: number; // int64
}

export interface DocumentMailData {
  documentId?: number; // int64
  createdOn?: string; // date-time
  authorId?: number; // int64
}
export interface EncryptionKey {
  token?: string;
}
export interface Featured {
  id?: number; // int64
  version?: number; // int64
  authorId?: number; // int64
  createdOn?: string; // date-time
  notes?: string;
  objectId?: number; // int64
  objectType?: string;
  userGroup?: number; // int64
  languageId?: number; // int64
  expireTime?: string; // date-time
}
export interface FeaturedCreate {
  notes?: string;
  objectId?: number; // int64
  objectType?: string;
  userGroup?: number /* int64 */[];
}
export interface FeaturedCreateData {
  featuredCreate?: FeaturedCreate;
  mailData?: MailData;
}
export interface GroupGallerySlider {
  id?: number; // int64
  ugId?: number; // int64
  fileName?: string;
  authorId?: number; // int64
  authorName?: string;
  authorImage?: string;
  title?: string;
  customDescripition?: string;
  moreLinks?: string;
  displayOrder?: number; // int64
}
export interface GroupHomePageData {
  showGallery?: boolean;
  showStats?: boolean;
  showGridMap?: boolean;
  showPartners?: boolean;
  showDesc?: boolean;
  description?: string;
  stats?: Stats;
  gallerySlider?: GroupGallerySlider[];
}
export interface MailData {
  documentMailData?: DocumentMailData;
  userGroupData?: UserGroupMailData[];
}
export interface ReorderingHomePage {
  galleryId?: number; // int64
  displayOrder?: number; // int64
}
export interface ShowFilterRule {
  hasSpatialRule?: boolean;
  spartialRuleList?: UserGroupSpatialData[];
  hasTaxonomicRule?: boolean;
  hasUserRule?: boolean;
  hasCreatedOnDateRule?: boolean;
  createdOnDateRuleList?: UserGroupCreatedOnDateRule[];
}
export interface Stats {
  maps?: number; // int64
  documents?: number; // int64
  discussions?: number; // int64
  activeUser?: number; // int64
}
export interface UserDTO {
  id?: number; // int64
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  latitude?: number; // double
  longitude?: number; // double
  location?: string;
  mobileNumber?: string;
  gender?: string;
  profession?: string;
  institution?: string;
  mapLocation?: string;
  verificationType?: string;
  mode?: string;
  recaptcha?: string;
}
export interface UserGroup {
  id?: number; // int64
  allow_members_to_make_species_call?: boolean;
  allow_non_members_to_comment?: boolean;
  allow_obv_cross_posting?: boolean;
  allowUserToJoin?: boolean;
  description?: string;
  domianName?: string;
  foundedOn?: string; // date-time
  homePage?: string;
  icon?: string;
  isDeleted?: boolean;
  name?: string;
  neLatitude?: number; // double
  neLongitude?: number; // double
  swLatitude?: number; // double
  swLongitude?: number; // double
  theme?: string;
  visitCount?: number; // int64
  webAddress?: string;
  languageId?: number; // int64
  sendDigestMail?: boolean;
  startDate?: string; // date-time
  filterRule?: string;
  newFilterRule?: string;
  showGallery?: boolean;
  showStats?: boolean;
  showGridMap?: boolean;
  showPartners?: boolean;
  showDesc?: boolean;
  habitatIds?: number /* int64 */[];
  speciesGroupIds?: number /* int64 */[];
}
export interface UserGroupAddMemebr {
  founderList?: number /* int64 */[];
  moderatorList?: number /* int64 */[];
  memberList?: number /* int64 */[];
}
export interface UserGroupCreateData {
  allowUserToJoin?: boolean;
  description?: string;
  homePage?: string;
  icon?: string;
  domainName?: string;
  name?: string;
  neLatitude?: number; // double
  neLongitude?: number; // double
  swLatitude?: number; // double
  swLongitude?: number; // double
  theme?: string;
  languageId?: number; // int64
  sendDigestMail?: boolean;
  newFilterRule?: string;
  invitationData?: UserGroupInvitationData;
}
export interface UserGroupCreatedOnDateRule {
  id?: number; // int64
  userGroupId?: number; // int64
  fromDate?: string; // date-time
  toDate?: string; // date-time
  isEnabled?: boolean;
}
export interface UserGroupDocCreateData {
  documentId?: number; // int64
  userGroupIds?: number /* int64 */[];
  mailData?: MailData;
}
export interface UserGroupEditData {
  allowUserToJoin?: boolean;
  description?: string;
  homePage?: string;
  icon?: string;
  domainName?: string;
  name?: string;
  neLatitude?: number; // double
  neLongitude?: number; // double
  swLatitude?: number; // double
  swLongitude?: number; // double
  theme?: string;
  languageId?: number; // int64
  sendDigestMail?: boolean;
  newFilterRule?: string;
  speciesGroupId?: number /* int64 */[];
  habitatId?: number /* int64 */[];
}
export interface UserGroupFilterDate {
  fromDate?: string; // date-time
  toDate?: string; // date-time
}
export interface UserGroupFilterEnable {
  filterId?: number; // int64
  isEnabled?: boolean;
  filterType?: string;
}
export interface UserGroupFilterRemove {
  filterName?: string;
  filterId?: number; // int64
}
export interface UserGroupFilterRuleInputData {
  hasUserRule?: boolean;
  spartialDataList?: string[];
  createdOnDateList?: UserGroupFilterDate[];
}

export interface Featured {
  id?: number; // int64
  version?: number; // int64
  authorId?: number; // int64
  createdOn?: string; // date-time
  notes?: string;
  objectId?: number; // int64
  objectType?: string;
  userGroup?: number; // int64
  languageId?: number; // int64
  expireTime?: string; // date-time
}
export interface UserGroupHomePageEditData {
  showGallery?: boolean;
  showStats?: boolean;
  showGridMap?: boolean;
  showPartners?: boolean;
  showDesc?: boolean;
  description?: string;
  gallerySlider?: GroupGallerySlider[];
}
export interface UserGroupCCA {
  id?: number; // int64
  name?: string;
  icon?: string;
  webAddress?: string;
  isParticipatory?: boolean;
}
export interface UserGroupInvitationData {
  userGroupId?: number; // int64
  founderIds?: number /* int64 */[];
  moderatorsIds?: number /* int64 */[];
  founderEmail?: string[];
  moderatorsEmail?: string[];
}
export interface UserGroupMailData {
  id?: number; // int64
  name?: string;
  icon?: string;
  webAddress?: string;
}
export interface UserGroupMappingCreateData {
  mailData?: MailData;
  userGroups?: number /* int64 */[];
}
export interface UserGroupMemberRole {
  userGroupId?: number; // int64
  roleId?: number; // int64
  getsUserId?: number; // int64
}

export interface UserGroupPermissions {
  userMemberRole?: UserGroupMemberRole[];
  userFeatureRole?: UserGroupMemberRole[];
}
export interface UserGroupSpatialData {
  id?: number; // int64
  userGroupId?: number; // int64
  spatialData?: string;
  isEnabled?: boolean;
}
export interface UserGroupWKT {
  wkt?: string;
}
export interface UserIbp {
  id?: number; // int64
  name?: string;
  profilePic?: string;
  isAdmin?: boolean;
}
